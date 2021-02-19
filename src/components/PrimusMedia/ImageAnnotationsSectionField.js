import React from 'react';

const ImageAnnotationsArrayField = (props) => {

    const { ArrayField } = props.registry.fields

    const { formData = [] } = props

    const count = formData.length || 0

    const title = count + " markeringer"

    const uiSchema = {
        ...props.uiSchema,
        "ui:title": title,
        "ui:options": {
            "sortable": true,
            "spacing": 0,
            "padding": 2,
            "addable": false
        },
        "ui:layout": "primusImageAnnotationsSection",
        "items": {
            "ui:field": "primusImageAnnotationsModule",
        }
    }

    return (
        <ArrayField {...props} uiSchema={uiSchema} />
    )

}

export default ImageAnnotationsArrayField;