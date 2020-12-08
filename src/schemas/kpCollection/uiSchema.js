import uiPreview from "./uiPreview"
import header from "./header/uiSchema"
import theme from "./theme/uiSchema"

export default {
    "ui:preview": uiPreview,
    "ui:field": "pageEditor",
    "ui:collapsible": true,
    "ui:fieldset": [
        "content",
        "settings",
    ],
    "settings": {
        "ui:fieldset": [
            "modelName",
            "collectionType",
            "title",
            "name",
            "siteId"
        ],
        "siteId": {
            "ui:field": "collectionSiteId"
        }
    },
    "content": {
        "ui:layout": "pageContent",
        "ui:nav": true,
        "ui:fieldset": [
            "header",
            "theme"
        ],
        "header": header,
        "theme": theme
    }
}