//import settings from "./PageSettings.uiSchema";
import links from "./KpLinks.uiSchema"

export default {
    "ui:field": "pageEditor",
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
        "header": {
            "ui:layout": "section",
            "ui:title": "Presentasjon",
            "ui:preview": {
                "select": {
                    "description": "description"
                },
                prepare({formData, formContext}) {
                    const { title } = formData;
        
                    const localeId = "locale:" + formContext.currentLocale
                    const description = title && title[localeId]
        
                    return {
                        description: description
                    }
        
                }
            },
            "ui:fieldset": [
                "title",
            ],
            "ui:options": {
                "expanded": true,
                "collapsible": true,
                "spacing": 2,
            },
            "title": {
                "ui:title": "Tittel"
            },
        },
        "media": {
            "ui:layout": "section",
            "ui:title": "Presentasjon",
            "ui:preview": {
                "select": {
                    "description": "description"
                },
                prepare({formData, formContext}) {
                    const { title } = formData;
        
                    const localeId = "locale:" + formContext.currentLocale
                    const description = title && title[localeId]
        
                    return {
                        description: description
                    }
        
                }
            },
            "ui:fieldset": [
                "title",
            ],
            "ui:options": {
                "expanded": true,
                "collapsible": true,
                "spacing": 2,
            },
            "title": {
                "ui:title": "Tittel"
            },
        },
        "body": {
            "ui:layout": "section",
            "ui:title": "Innhold",
            "ui:icon": "link",
            "ui:fieldset": [
                "links"
            ],
            "ui:settings": [
        //        "linksLayout"
            ],
            "links": links
        },
    }
}