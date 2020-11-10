import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import annotateHeader from "./annotateHeader/uiSchema"
import annotateBody from "./annotateBody/uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content",
        "settings"
    ],
    "content": {
        "ui:field": "kpPage",
        "ui:fieldset": [
            "header",
            "body"
        ],
        "header": annotateHeader,
        "body": annotateBody
    },
    "settings": settings
}