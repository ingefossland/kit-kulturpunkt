import React, { useState, useRef, createRef } from 'react'
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone'

import PrimusObjectFieldTemplate from "./PrimusObjectFieldTemplate"

import { 
    getUploadProps,
    getEventsProps,
    getEditorAction,
 } from "./utils"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const PrimusEditorField = (props) => {
    const { idSchema, schema, formData, formContext, onChange } = props;
    const { imageUrl, uniqueId, status, statusCode, statusMessage, title, createdAt, updatedAt, deletedAt } = formData;
    const { isEditing = true, isLoading, isSaving, currentId, currentLocale, onExpand, onCollapse, onSelect, onLocale, onSubmit } = formContext;

    const { t, i18n } = useTranslation(['editor'])

    const uiOptions = getUiOptions(props.uiSchema)

    const { _onUpload } = getUploadProps(props)
    const { _onEventAdd } = getEventsProps(props)

    // dropzone

    const dropzoneRef = useRef(null)

    const _onUploadClick = () => {
        dropzoneRef && dropzoneRef.current && dropzoneRef.current.open()
    }

    // primary + secondary actions

    const primaryAction = formContext.primaryAction || getEditorAction({t, ...props})

    // toggle fieldset

    const { fieldset } = uiOptions

    const idPrefix = idSchema && idSchema.$id
    const primaryId = fieldset && fieldset[0] && idPrefix + "_" + fieldset[0]
    const secondaryId = fieldset && fieldset[1] && idPrefix + "_" + fieldset[1]
    const expanded = secondaryId && currentId && currentId.startsWith(secondaryId)

    const _onToggleSettings = () => {

        if (!expanded) {
            secondaryId && onExpand && onExpand({id: secondaryId})
        } else {
            primaryId && onExpand && onExpand({id: ""})
        }

    }

    const defaultLocale = formContext.defaultLocale || formContext.languages && formContext.languages[0]

    const _onLocale = (locale) => {
        onLocale && onLocale(locale)
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:layout": "primusEditor",
        "ui:title": title,
        "ui:expanded": expanded,
        "ui:primaryAction": primaryAction,
        "ui:status": status,
        "ui:statusDate": updatedAt || createdAt || deletedAt,
        "ui:statusCode": statusCode,
        "ui:statusMessage": statusMessage,
        "ui:onSelect": (item) => onSelect(item),
        "ui:currentLocale": currentLocale,
        "ui:onLocale": (locale) => _onLocale(locale),
        "ui:onToggleSettings": () => _onToggleSettings(),
        "ui:onTogglePreview": formContext && formContext.onTogglePreview
    }

    const { ObjectField } = props.registry.fields;

    const registry = {
        ...props.registry,
        ObjectFieldTemplate: PrimusObjectFieldTemplate,
        formContext: {
            ...formContext,
            imageUrl: imageUrl,
            uniqueId: uniqueId,
            currentLocale: currentLocale,
            _onUpload: _onUpload,
            _onUploadClick: _onUploadClick,
            _onEventAddClick: _onEventAdd
        }
    }

    return (
        <>
            <Dropzone ref={dropzoneRef} onDrop={_onUpload}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
            <ObjectField {...props} formContext={registry.formContext} registry={registry} uiSchema={uiSchema} />
        </>
    )

}

export default PrimusEditorField;