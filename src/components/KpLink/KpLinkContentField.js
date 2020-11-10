import React, { Component } from 'react';

import KpLinkContentLayout from "./KpLinkContentLayout"
import KpLinkMediaLayout from "./KpLinkMediaLayout"
import KpLinkReferenceLayout from "./KpLinkReferenceLayout"

import { utils } from "@rjsf/core"
const { getUiOptions, getDefaultFormState } = utils

const KpLinKContentField = (props) => {

    const { formData, formContext, schema, uiSchema, registry} = props

    const mediaId = formData && formData.mediaId
    const media = formData && formData.media
    const mediaType = media && media.mediaType

    const referenceId = formData && formData.referenceId
    const reference = formData && formData.reference
    const referenceTitle = reference && reference.title
    const referenceDescription = reference && reference.description

    /*
    const imageUrl = media.imageUrl || reference.imageUrl;
    const imageFocalpoint = formData && formData.imageFocalpoint
    const imageCropdata = formData && formData.imageCropdata
    const imageFilters = formData && formData.imageFilters
    */

    const backgroundColor = formData && formData.backgroundColor;
    const color = formData && formData.color;

    const _onMediaChange = ({mediaId, media}) => {

        console.log('MEDIA change', media)

        const newFormData = getDefaultFormState(schema, {
            ...formData,
            mediaId: mediaId,
            media: media
        }, registry.definitions);

        props.onChange && props.onChange(newFormData)

    }

    const _onMediaDialog = (props) => {

        formContext.onDialog && formContext.onDialog({
            ...props,
            schema: {
                type: "object",
                properties: {
                    mediaId: schema.properties.mediaId,
                    media: schema.properties.media
                }
            },
            formData: {
                mediaId: mediaId,
                media: media
            },
            onChange: _onMediaChange
        })

    }

    const _onReferenceChange = ({referenceId, reference}) => {

        const newFormData = getDefaultFormState(schema, {
            ...formData,
            referenceId: referenceId,
            reference: reference
        }, registry.definitions);

        props.onChange && props.onChange(newFormData)

    }

    const _onReferenceDialog = (props) => {

        formContext.onDialog && formContext.onDialog({
            ...props,
            schema: {
                type: "object",
                properties: {
                    referenceId: schema.properties.referenceId,
                    reference: schema.properties.reference
                }
            },
            onChange: _onReferenceChange
        })

    }
    
    const newUiSchema = {
        "ui:layout": KpLinkContentLayout,
        "ui:fieldset": [
            "linkMedia",
            "linkContent",
            "linkReference",
        ],
        "ui:options": {
            "spacing": 2,
            "grid": true,
        },
        "linkMedia": {
            "ui:layout": KpLinkMediaLayout,
            "ui:fieldset": [
                "mediaId",
                "media",
                "referenceId",
                "reference"
            ],
            "ui:xs": 4,
            "ui:mediaId": mediaId,
            "ui:media": media,
            "ui:referenceId": referenceId,
            "ui:reference": reference,
            "ui:onDialog": _onMediaDialog,
            "ui:onChange": _onMediaChange,
        },
        "linkContent": {
            "ui:xs": 8,
            "ui:spacing": 2,
            "ui:fieldset": [
                "runningHead",
                "title",
                "description",
            ],
            "runningHead": {
                "ui:title": "Stikktittel"
            },
            "title": {
                "ui:title": "Tittel",
                "ui:placeholder": referenceTitle
            },
            "description": {
                "ui:title": "Beskrivelse",
                "ui:placeholder": referenceDescription,
                "ui:widget": "textarea"
            },
        },
        "linkReference": {
            "ui:layout": KpLinkReferenceLayout,
            "ui:xs": 12,
            "ui:fieldset": [
                "referenceId",
                "reference"
            ],
            "ui:referenceId": referenceId,
            "ui:reference": reference,
            "ui:dialog": {
                "query": {
                    "models": "documents",
                    "documentType": ["page*","article"]
                }
            },
            "ui:onDialog": _onReferenceDialog,
            "ui:onChange": _onReferenceChange,
        },
    }

    const { ObjectField } = registry.fields


    return <ObjectField {...props} uiSchema={newUiSchema} />

    return (
        <p>{JSON.stringify(uiSchema)}</p>
    )

}

export default KpLinKContentField