import React, { Component } from 'react';
import Color from 'color';
import model from "./KpLink.model"

import KpLinkContentField from "./KpLinkContentField"

import { utils } from "@rjsf/core"
const { getUiOptions, getDefaultFormState } = utils



const KpLinkField = (props) => {
    const { formData, formContext, registry } = props


    const schema = {
        ...model.schema,
//        ...props.schema
    }

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema,
        "ui:layout": "kpLink"
    }

    const mediaId = formData && formData.mediaId
    const media = formData && formData.media

    const referenceId = formData && formData.referenceId
    const reference = formData && formData.reference
    const referenceTitle = reference && reference.title

    const imageUrl = media.imageUrl || referenceId && reference && reference.imageUrl;
    const imageFocalpoint = formData && formData.imageFocalpoint
    const imageCropdata = formData && formData.imageCropdata
    const imageFilters = formData && formData.imageFilters

    const backgroundColor = formData && formData.backgroundColor;
    const color = formData && formData.color;

    const getContrastColor = (hex) => {
        const color = Color(hex)
        return color.isLight() && "black" || "white"
    }

    const handleChange = (formData) => {

        if (formData.backgroundColor !== backgroundColor) {
            formData.color = getContrastColor(formData.backgroundColor)
        }

        if (formData.color !== color) {
            formData.titleColor = formData.color
        }

        const newFormData = getDefaultFormState(schema, formData, registry.definitions);
        props.onChange && props.onChange(newFormData)
    }



    const handleCropdata = (imageCropdata) => {
        props.onChange && props.onChange({
            ...formData,
            imageCropdata: imageCropdata
        })
    }

    const handleFocalpoint = (imageFocalpoint) => {
        props.onChange && props.onChange({
            ...formData,
            imageFocalpoint: imageFocalpoint
        })
    }

    const handleFilters = (imageFilters) => {
        props.onChange && props.onChange({
            ...formData,
            imageFilters: imageFilters
        })
     }
    
    const getUiSchema = () => {
        const uiOptions = getUiOptions(uiSchema);

        let fieldset = []

        const uiPreview = {
            "ui:mediaId": mediaId,
            "ui:media": mediaId,
            "ui:referenceId": referenceId,
            "ui:reference": reference,
            "ui:imageUrl": imageUrl,
            "ui:imageCropdata": imageCropdata,
            "ui:imageFilters": imageFilters,
            "ui:imageFocalpoint": imageFocalpoint,
        }

        let newUiSchema = {}

        if (uiSchema.content) {
            newUiSchema.content = {
                ...uiSchema.content,
                ...uiPreview,

                "ui:field": KpLinkContentField,

            }

            fieldset.push('content')

        }

        if (uiSchema.imageCropdata && imageUrl) {
            newUiSchema.imageCropdata = {
                ...uiSchema.imageCropdata,
                ...uiPreview,
                "ui:onChange": (cropdata) => handleCropdata(cropdata),
            }

            fieldset.push('imageCropdata')
        }

        if (uiSchema.imageFocalpoint && imageUrl) {
            newUiSchema.imageFocalpoint = {
                ...uiSchema.imageFocalpoint,
                ...uiPreview,
                "ui:onChange": (focalpoint) => handleFocalpoint(focalpoint),
            }

            fieldset.push('imageFocalpoint')

        }

        if (uiSchema.imageFilters && imageUrl) {
            newUiSchema.imageFilters = {
                ...uiSchema.imageFilters,
                ...uiPreview,
                "ui:onChange": (filters) => handleFilters(filters),
            }

            fieldset.push('imageFilters')
        }

        if (formContext.pageType === "annotate") {
            newUiSchema.imageAnnotations = {
                ...uiSchema.imageAnnotations,
                ...uiPreview
            }

            fieldset.push('imageAnnotations')
        }

        return {
            ...uiSchema,
            ...newUiSchema,
            "ui:options": uiOptions,
            "ui:fieldset": fieldset,
            "color": {
                ...uiSchema.color,
                "ui:backgroundColor": formData && formData.backgroundColor
            },
            "link": {
                ...newUiSchema.link,
                "linkContent": {
                    ...newUiSchema.content.linkContent,
                    "titleColor": {
                        "ui:backgroundColor": formData && formData.backgroundColor
                    }
                }
            }
        }

    }

    const newUiSchema = getUiSchema()

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} schema={schema} uiSchema={newUiSchema} onChange={handleChange} />
    )

}

export default KpLinkField