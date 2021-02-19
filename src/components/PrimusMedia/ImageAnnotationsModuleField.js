import React from 'react';

const ImageAnnotationsArrayItemField = (props) => {

    const uiSchema = {
        ...props.uiSchema,
        "ui:options": {
            "collapsible": true
        },
        "ui:layout": "primusImageAnnotationsModule",
        "ui:preview": {
            "select": {
                "badgeContent": "badgeContent",
                "untitled": "untitled",
                "title": "title"
            },
            prepare({formData, index}) {

                const count = index + 1

                return {
                    title: formData.title,
                    untitled: "Markering " + count,
                    badgeContent: count
                }
            }
        },
        "ui:fieldset": [
            "title",
            "description",
        ],
        "title": {
            "ui:title": "Tittel",
        },
        "description": {
            "ui:title": "Beskrivelse",
            "ui:widget": "textarea"
        }
    }

    const { ObjectField } = props.registry.fields


    return (
        <ObjectField {...props} uiSchema={uiSchema} />
    )

}

export default ImageAnnotationsArrayItemField;