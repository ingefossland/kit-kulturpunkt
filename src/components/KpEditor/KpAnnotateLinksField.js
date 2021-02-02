import React from 'react';

const ImageAnnotateArrayField = ({registry, ...props}) => {
    const { ArrayField } = registry.fields;
    const { onAnnotateArrayChange } = registry.formContext

    return (
        <ArrayField {...props} registry={registry} onChange={onAnnotateArrayChange} />
    )

}

export default ImageAnnotateArrayField;