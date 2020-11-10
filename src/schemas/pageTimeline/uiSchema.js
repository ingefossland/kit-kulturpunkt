import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import header from "./timelineHeader/uiSchema"
import media from "./timelineMedia/uiSchema"
import body from "./timelineBody/uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content"
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