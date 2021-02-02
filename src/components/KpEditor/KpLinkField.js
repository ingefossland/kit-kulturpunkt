import React from 'react';
import Color from 'color';
import model from "./KpLink.model"

import KpLinkContentField from "./KpLinkContentField"
import KpLinkLayout from "./KpLinkLayout"

import { utils } from "@rjsf/core"
const { getUiOptions, getDefaultFormState } = utils

const KpLinkField = (props) => {
    const { formData, formContext, registry } = props

    const schema = {
        ...model.schema,
        ...props.schema
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

    const _onChange = (formData) => {

        if (formData.backgroundColor !== backgroundColor) {
            formData.color = getContrastColor(formData.backgroundColor)
        }

        if (formData.color !== color) {
            formData.titleColor = formData.color
        }

        const newFormData = getDefaultFormState(schema, formData, registry.definitions);
        props.onChange && props.onChange(newFormData)
    }

    const _onCropChange = (imageCropdata) => {
        props.onChange && props.onChange({
            ...formData,
            imageCropdata: imageCropdata
        })
    }

    const _onFocalpoint = (imageFocalpoint) => {
        props.onChange && props.onChange({
            ...formData,
            imageFocalpoint: imageFocalpoint
        })
    }

    const _onFiltersChange = (imageFilters) => {
        props.onChange && props.onChange({
            ...formData,
            imageFilters: imageFilters
        })
     }
    
    const getUiSchema = () => {

        let uiSchema = {
            ...model.uiSchema,
            ...props.uiSchema,
            "ui:layout": KpLinkLayout
        }
    
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

        if (uiSchema.content) {
            uiSchema.content = {
                ...uiSchema.content,
                ...uiPreview,
                "ui:field": KpLinkContentField,
            }

            fieldset.push('content')

        }

        if (uiSchema.imageCropdata && imageUrl) {
            uiSchema.imageCropdata = {
                ...uiSchema.imageCropdata,
                ...uiPreview,
                "ui:onChange": (cropdata) => _onCropChange(cropdata),
            }

            fieldset.push('imageCropdata')
        }

        if (uiSchema.imageFocalpoint && imageUrl) {
            uiSchema.imageFocalpoint = {
                ...uiSchema.imageFocalpoint,
                ...uiPreview,
                "ui:onChange": (focalpoint) => _onFocalpoint(focalpoint),
            }

            fieldset.push('imageFocalpoint')

        }

        if (uiSchema.imageFilters && imageUrl) {
            uiSchema.imageFilters = {
                ...uiSchema.imageFilters,
                ...uiPreview,
                "ui:onChange": (filters) => _onFiltersChange(filters),
            }

            fieldset.push('imageFilters')
        }

        if (formContext.pageType === "annotate") {
            uiSchema.imageAnnotations = {
                ...uiSchema.imageAnnotations,
                ...uiPreview
            }

            fieldset.push('imageAnnotations')
        }

        return {
            ...uiSchema,
            "ui:options": uiOptions,
            "ui:fieldset": fieldset,
            "color": {
                ...uiSchema.color,
                "ui:backgroundColor": formData && formData.backgroundColor
            },
            "link": {
                ...uiSchema.link,
                "linkContent": {
                    ...uiSchema.content.linkContent,
                    "titleColor": {
                        "ui:backgroundColor": formData && formData.backgroundColor
                    }
                }
            }
        }

    }

    const uiSchema = getUiSchema()

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} schema={schema} uiSchema={uiSchema} onChange={_onChange} />
    )

}

export default KpLinkField