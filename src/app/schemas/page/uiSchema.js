import uiPreview from "./uiPreview"
import settings from "./settings/uiSchema";

import header from "./pageHeader/uiSchema"
import media from "./pageMedia/uiSchema"
import body from "./pageBody/uiSchema"

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
        "body": body,
    },
    "settings": settings
}