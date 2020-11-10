import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import header from "./listHeader/uiSchema"
import media from "./listMedia/uiSchema"
import body from "./listBody/uiSchema"

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
            "media",
            "body"
        ],
        "header": header,
        "media": media,
        "body": body
    },
    "settings": settings
}