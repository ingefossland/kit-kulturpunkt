import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import header from "./gridHeader/uiSchema"
import media from "./gridMedia/uiSchema"
import body from "./gridBody/uiSchema"

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
            "media",
            "body"
        ],
        "header": header,
        "media": media,
        "body": body
    },
    "settings": settings
}