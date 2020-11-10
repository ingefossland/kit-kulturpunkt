import React, { useState, useEffect } from 'react';
import { ImageAnnotations } from "@kit-ui/admin"

const KioskAnnotateImageField = ({registry, formContext, ...props}) => {
    const { annotateImage, imageAnnotations, onAnnotateImageChange } = registry.formContext
    const { mediaId, media, imageFilters } = annotateImage

    return (
        <ImageAnnotations imageUrl={media.imageUrl} imageFilters={imageFilters} imageAnnotations={imageAnnotations} onChange={onAnnotateImageChange} />
    )

}

export default KioskAnnotateImageField;