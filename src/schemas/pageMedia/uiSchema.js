import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import header from "./mediaHeader/uiSchema"
import body from "./mediaBody/uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content",
        "settings"
    ],
    "content": {
        "ui:field": "kioskPage",
        "ui:fieldset": [
            "header",
            "body"
        ],
        "header": header,
        "body": body
    },
    "settings": settings
}