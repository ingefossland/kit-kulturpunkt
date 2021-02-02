import iptcdata from "./iptcdata/uiSchema"
import uiSchema from '../media/uiSchema';

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "data",
            "metadata",
            "rights",
            "iptcdata",
            "exifdata",
        ],
        "data": {
            ...uiSchema.content.data,
            "ui:icon": "image",
            "ui:title": "Bilde"
        },
        "iptcdata": {
            ...iptcdata,
            "ui:layout": "section",
            "ui:title": "IPTC"
        },
        "exifdata": {
            "ui:layout": "section",
            "ui:title": "EXIF"
        },
    }
}