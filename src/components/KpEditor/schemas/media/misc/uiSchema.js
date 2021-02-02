import uiSchema from '../media/uiSchema';

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "data",
            "metadata",
            "rights",
        ],
        "data": {
            ...uiSchema.content.data,
            "ui:icon": "album",
            "ui:title": "Misc"
        },
    }
}