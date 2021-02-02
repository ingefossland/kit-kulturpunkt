import uiSchema from '../media/uiSchema';
import artwork from '../media/artwork/uiSchema';
import audiotracks from '../media/audiotracks/uiSchema';
import captions from '../media/captions/uiSchema';

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "data",
            "artwork",
            "audiotracks",
            "captions",
            "metadata",
            "rights",
        ],
        "data": {
            ...uiSchema.content.data,
            "ui:icon": "album",
            "ui:title": "Audio"
        },
        "artwork": artwork,
        "audiotracks": audiotracks,
        "captions": captions
    }
}