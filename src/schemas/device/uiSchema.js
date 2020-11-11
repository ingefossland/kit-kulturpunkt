import settings from "./settings/uiSchema";
import header from "./header/uiSchema";
import media from "./media/uiSchema";
import hasPages from "./hasPages/uiSchema";
import uiPreview from "./uiPreview";

export default {
    "ui:preview": uiPreview,
    "ui:field": "pageEditor",
    "ui:fieldset": [
        "content",
//        "settings"
    ],
    "settings": settings,
    "content": {
        "ui:field": "kpDevice",
        "ui:nav": true,
        "ui:fieldset": [
            "header",
            "media",
            "hasPages",
        ],
        "header": header,
        "media": media,
        "hasPages": hasPages
    }
}