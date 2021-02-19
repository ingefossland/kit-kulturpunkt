import React, { useState, useEffect } from 'react';
import { ImageAnnotations } from "@kit-ui/admin"
import model from "./KpAnnotateImage.model"

const KioskAnnotateImageField = ({formData, formContext, ...props}) => {
    const { annotateImage = {}, imageAnnotations, onAnnotateImageChange } = formContext
    const { mediaId, media, imageFilters } = annotateImage

    const { ObjectField } = props.registry.fields

    const uiSchema = {
        "ui:layout": ImageAnnotations,
        "ui:imageUrl": media && media.imageUrl,
        "ui:imageFilters": imageFilters,
        "ui:imageAnnotations": imageAnnotations,
        "ui:onChange": onAnnotateImageChange
    }

    return (
        <ObjectField {...props} uiSchema={uiSchema} /> 
    )

}

export default KioskAnnotateImageField;