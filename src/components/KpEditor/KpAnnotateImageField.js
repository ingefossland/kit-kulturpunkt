import React, { useState, useEffect } from 'react';
import { ImageAnnotations } from "@kit-ui/admin"

const KioskAnnotateImageField = ({formContext, uiSchema, ...props}) => {
    const { annotateImage = {}, imageAnnotations, onAnnotateImageChange } = formContext
    const { mediaId, media, imageFilters } = annotateImage

//    const uiOptions = getUiOptions(uiSchema)

    return (
        <ImageAnnotations imageUrl={media && media.imageUrl} imageFilters={imageFilters} imageAnnotations={imageAnnotations} onChange={onAnnotateImageChange} />
    )

}

export default KioskAnnotateImageField;