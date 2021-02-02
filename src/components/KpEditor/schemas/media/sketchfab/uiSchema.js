import source from "../media/source/uiSchema"
import uiSchema from "../media/uiSchema"

export default {
    ...uiSchema,
    "ui:fieldset": [
        "contentSource"
    ],
    "contentSource": {
        ...uiSchema.content,
        "ui:fieldset": [
            "source"
        ],
        "source": {
            ...source,
            "ui:layout": "section",
            "ui:icon": "local_play",
            "ui:title": "Sketchfab",
        }
    }
}