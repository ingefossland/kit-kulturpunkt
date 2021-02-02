import uiSchema from '../media/uiSchema';
import audiotracks from '../media/audiotracks/uiSchema';
import captions from '../media/captions/uiSchema';

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "data",
            "audiotracks",
            "captions",
            "metadata",
            "rights"
        ],
        "data": {
            ...uiSchema.content.data,
            "ui:icon": "movie",
            "ui:title": "Video",
        },
        "audiotracks": audiotracks,
        "captions": captions
    }
}