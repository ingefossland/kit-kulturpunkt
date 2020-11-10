import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { utils } from "@rjsf/core"
const { getUiOptions, getDefaultFormState } = utils


const FieldKioskPage = (props) => {
    const { registry, formData, schema, uiSchema, formContext } = props;

    const handleChange = (formData) => {
        const newFormData = getDefaultFormState(schema, formData, registry.definitions);
        props.onChange(newFormData)
    }

    const _onAnnotateArrayChange = (links = []) => {
        console.log('onAnnotateArrayChange', links)

        handleChange({
            ...formData,
            links: links
        })

    }

    const _onAnnotateImageChange = (links = []) => {
        console.log('onAnnotateImageChange', links)

        handleChange({
            ...formData,
            links: links
        })
 
    }

    const annotateImage = formData && formData.backgroundImage
    const imageAnnotations = formData && formData.links

    let newRegistry = {
        ...registry,
        formContext: {
            ...registry.formContext,
            annotateImage: annotateImage,
            imageAnnotations: imageAnnotations,
            onAnnotateArrayChange: _onAnnotateArrayChange,
            onAnnotateImageChange: _onAnnotateImageChange,
        }
    }

    useEffect(() => {
        newRegistry.formContext.imageAnnotations = imageAnnotations
    }, [imageAnnotations])

    const newUiSchema = {
        ...uiSchema,
        "ui:dialog": formContext.dialog,
        "ui:preview": formContext.preview,
        "ui:sidebar": {
            ...formContext.dialog,
            ...formContext.sidebar
        },
        "ui:layout": "pageContent",

    }

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} registry={newRegistry} uiSchema={newUiSchema} onChange={handleChange} />
    )


}

export default FieldKioskPage