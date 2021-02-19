import theme from "../ThemeEditor/ThemeEditor.uiSchema"

export default {
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
        "header": {
            "ui:title": "Informasjon",
            "ui:icon": "info",
            "ui:layout": "section",
            "ui:options": {
                "spacing": 2
            },
            "ui:fieldset": [
                "title",
                "description",
                "siteId"
            ],
            "title": {
                "ui:title": "Tittel"
            },
            "description": {
                "ui:title": "Beskrivelse",
                "ui:widget": "textarea"
            },
            "siteId": {
                "ui:title": "Eier",
                "ui:field": "collectionSiteId"
            },
        
        },
        "theme": {
            ...theme,
            "ui:title": "Theme",
            "ui:icon": "palette",
            "ui:layout": "section",
            "ui:options": {
                "spacing": 2
            },
        }
    }
}