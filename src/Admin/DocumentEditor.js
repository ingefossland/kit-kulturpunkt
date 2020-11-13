import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';
import { editModel, saveModel } from '../redux/editor';
import qs from 'query-string';

import Editor from "../Editor/Editor"
import EditorLoader from "../Editor/EditorLoader"

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview, getDefaultFormState } = utils

const DocumentEditor = (props) => {
    const { uniqueId, documentType } = props.match.params

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)
    const formData = editor.formData

    // create new

    useEffect(() => {
        const { search } = props.location
        const sq = search && qs.parse(search) || {}

        documentType && dispatch(editModel({
            collectionId: app.collectionId,
            schemaId: 1,
            locale: "no",
            documentType: documentType,
            content: sq.content && JSON.parse(sq.content) || {}
        }))
    }, [documentType])

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
            } else if (key === "documentType") {
                value = uniqueId
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

        location = location.replace("new", "edit");
        props.history.replace(location);

    }

    // set formContext

    const _onBack = () => {
        props.history.goBack()
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onEditReference = ({id, formData: { referenceId, reference: { documentType } }}) => {

        const referenceUrl = app.root + "/" + referenceId + "/edit/#" + id

        props.history.push({
            pathname: referenceUrl,
            search: "?backUrl=" + props.location.pathname + "&backId=" + id
        })
        

    }


    const formContext = {
        isLoading: editor && editor.isLoading,
        isSaving: editor && editor.isSaving,
        id: formData && formData.id,
        uniqueId: formData && formData.uniqueId,
        collectionId: formData && formData.collectionId,
        parents: app && app.parents,
        languages: app && app.languages,
        onBack: _onBack,
        onSelect: _onSelect,
        onEditReference: _onEditReference
    }

    // get schemas based on documentType

    const modelType = uniqueId && formData.documentType || documentType
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
            collectionId: collectionId,
            schemaId: 1,
            locale: "no",
        }

        dispatch(saveModel(formData))

        if (documentType && !uniqueId && formData.uniqueId) {
            _onHistory(formData.uniqueId)
        }

    }


    return (
        <EditorLoader formData={formData} schema={schema} uiSchema={uiSchema}>
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