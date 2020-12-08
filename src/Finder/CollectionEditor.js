import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editModel, saveModel } from '../redux/editor';
import qs from 'query-string';

import Editor from "../Editor/Editor"
import EditorLoader from "../Editor/EditorLoader"

import CollectionPreview from "./CollectionPreview"
import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview, getDefaultFormState } = utils

const CollectionEditor = (props) => {
    const { uniqueId } = props.match.params
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)
    const formData = editor.formData

    // create new

    useEffect(() => {
        sq.collectionType && dispatch(editModel({
            modelName: "collections",
            collectionType: sq.collectionType,
            defaultLocale: "no",
            content: sq.content && JSON.parse(sq.content) || {}
        }))
    }, [sq.collectionType])

    // load uniqueId

    useEffect(() => {
        uniqueId && dispatch(editModel({modelName: "collections", uniqueId: uniqueId}))
    }, [uniqueId])

    // uniqueId has changed, update location

    const _onHistory = (uniqueId) => {

        const { path, params } = props.match;
        const { hash, search } = props.location;
        
        let location = path;
    
        if (hash) {
            location = location + hash;
        }
    
        for (let key in params) {
      
            let value;
          
            if (key === "uniqueId") {
                value = uniqueId
            } else if (key === "new") {
//                value = uniqueId + "/edit"
            } else {
                value = params[key];
            }

            if (value) {
                location = location.replace(':'+key+"*", value);
                location = location.replace(':'+key, value);
            } else {
                location = location.replace(':'+key+"*", '');
                location = location.replace(':'+key, '');
            }

            location = location.replace("//", "/");

        }

        location = location.replace("new", uniqueId + "/edit");
        props.history.replace(location);

    }

    // set formContext

    const formContext = {
        preview: {
            template: CollectionPreview
        }
    }

    // get schemas based on collectionType

    const modelType = formData.collectionType
    const modelId = modelType && "collections/"+modelType 
    const model = schemasByName && schemasByName[modelId]

    const schema = model && model.schema
    const uiSchema = model && model.uiSchema

    // submit

    const _onSubmit = ({formData}) => {

        const status = formData && formData.status

        const uiPreview = getUiPreview({schema, uiSchema, formData})
        
        formData = {
            ...formData,
            ...uiPreview,
        }

        if (status === "copy") {
            formData.name = formData.name + " (copy)"
            formData.status = "draft"
            delete formData.id
            delete formData.uniqueId
        }


        dispatch(saveModel(formData))
    }

    useEffect(() => {
        editor.isSaving && formData.uniqueId && _onHistory(formData.uniqueId)
    }, [editor.isSaving])


    return (
        <EditorLoader formData={formData} schema={schema} uiSchema={uiSchema} {...props}>
            <Editor {...props}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                formContext={formContext}
                preview={model && model.preview}
                onSubmit={_onSubmit} />
        </EditorLoader>
    )

}

CollectionEditor.defaultProps = {
}

export default CollectionEditor