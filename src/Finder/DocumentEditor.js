import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editModel, saveModel } from '../redux/editor';
import qs from 'query-string';

import Editor from "../Editor/Editor"
import EditorLoader from "../Editor/EditorLoader"

import DocumentPreview from "./DocumentPreview"

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview, getDefaultFormState } = utils

const DocumentEditor = (props) => {
    const { uniqueId, documentType } = props.match.params
    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)
    const formData = editor.formData

    // create new document

    useEffect(() => {
        sq.documentType && dispatch(editModel({
            collectionId: app.collectionId,
            schemaId: 1,
            locale: "no",
            parentId: sq.parentId || null,
            documentType: sq.documentType,
            content: sq.content && JSON.parse(sq.content) || {}
        }))
    }, [sq.documentType])

    // load uniqueId

    useEffect(() => {
        uniqueId && dispatch(editModel({uniqueId: uniqueId}))
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
            template: DocumentPreview
        }
    }

    // get schemas based on documentType

    const modelType = formData.documentType // || documentType
    const documentModel = modelType && "documents/"+modelType 
    const model = schemasByName && schemasByName[documentModel]

    const schema = model && model.schema
    const uiSchema = model && model.uiSchema

    // submit

    const collectionId = useSelector(state => state.app.collectionId)

    const _onSubmit = ({formData}) => {

        const uiPreview = getUiPreview({schema, uiSchema, formData})
        
        formData = {
            ...formData,
            ...uiPreview,
            locale: formData.locale || "no",
            collectionId: formData.collectionId || collectionId,
            schemaId: 1,
        }

        dispatch(saveModel(formData))

        if (!uniqueId && formData.uniqueId) {
            _onHistory(formData.uniqueId)
        }

    }


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

DocumentEditor.defaultProps = {
}

export default DocumentEditor