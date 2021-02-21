import uiPreview from "./uiPreview"
import header from "./header/uiSchema";
import body from "./body/uiSchema";
import isPartOf from "./isPartOf/uiSchema";
import settings from "./settings/uiSchema";

export default {
    "ui:preview": uiPreview,
    "ui:field": "pageEditor",
    "ui:collapsible": true,
    "ui:fieldset": [
        "content",
        "settings",
    ],
    "settings": settings,
    "content": {
        "ui:layout": "pageContent",
        "ui:fieldset": [
            "header",
            "body",
            "isPartOf"
        ],
        "header": header,
        "body": body,
        "isPartOf": isPartOf
    }
}