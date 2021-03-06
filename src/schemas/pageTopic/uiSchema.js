import uiPreview from "./uiPreview"
import settings from "../page/settings/uiSchema"
import header from "./header/uiSchema"
import body from "./body/uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:collapsible": true,
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content",
        "settings"
    ],
    "content": {
//        "ui:field": "kioskPage",
        "ui:layout": "pageContent",
        "ui:fieldset": [
            "header",
            "body"
        ],
        "header": header,
        "body": body
    },
    "settings": settings
}