import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editModel, saveModel } from '../redux/editor';

import Editor from "../Editor/Editor"
import EditorLoader from "../Editor/EditorLoader"

import MediaPreview from "./MediaPreview"

import schemasByName from "../app/schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview, getDefaultFormState } = utils

const MediaEditor = (props) => {
    const { uniqueId } = props.match.params

    const dispatch = useDispatch()

    useEffect(() => {
        uniqueId && dispatch(editModel({modelName: "media", uniqueId: uniqueId}))
    }, [uniqueId])


    // set formContext

    const _onBack = () => {
        props.history.goBack()
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const editor = useSelector(state => state.editor)
    const formData = editor.formData

    const formContext = {
        isLoading: editor && editor.isLoading,
        isSaving: editor && editor.isSaving,
        onBack: _onBack,
        onSelect: _onSelect,
        preview: {
            template: MediaPreview
        }
    }

    // get schemas based on documentType

    const mediaType = uniqueId && formData && formData.mediaType
    const mediaModel = mediaType && "media/" + mediaType
    const model = schemasByName && schemasByName[mediaModel]

    const schema = model && model.schema
    const uiSchema = model && model.uiSchema

    // submit

    const collectionId = useSelector(state => state.app.collectionId)

    const _onSubmit = ({formData}) => {

        const uiPreview = getUiPreview({schema, uiSchema, formData})
        
        formData = {
            ...formData,
            ...uiPreview,
            modelName: "media",
            collectionId: collectionId,
            schemaId: 1,
            locale: "no",
        }

        dispatch(saveModel(formData))
    }


    return (
        <EditorLoader formData={formData} schema={schema} uiSchema={uiSchema} {...props}>
            <Editor {...props}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                formContext={formContext}
                onSubmit={_onSubmit} />
        </EditorLoader>
    )

}

MediaEditor.defaultProps = {
}

export default MediaEditor