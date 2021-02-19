import React from 'react';
import model from "./KpAnnotateLinks.model"

const ImageAnnotateArrayField = ({uiSchema, registry, ...props}) => {
    const { ArrayField } = registry.fields;
    const { onAnnotateArrayChange } = registry.formContext

    uiSchema = {
        ...model.uiSchema,
        ...uiSchema
    }

    return (
        <ArrayField {...props} uiSchema={uiSchema} registry={registry} onChange={onAnnotateArrayChange} />
    )

}

export default ImageAnnotateArrayField;