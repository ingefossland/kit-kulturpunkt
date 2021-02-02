import KpPageContentField from "./KpPageContentField"
import links from "./KpLinks.uiSchema"

export default {
    "ui:field": KpPageContentField,
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
        "ui:title": "Media",
        "ui:fieldset": [
            "media",
        ],
        "ui:options": {
            "collapsible": true,
            "spacing": 2,
        },
        "media": {
            "ui:options": {
    //            "grid": true,
                "spacing": 2
            },
            "ui:fieldset": [
                "backgroundImage"
            ],
            "backgroundImage": {
                "ui:layout": "media",
                "ui:buttons": [
                    {
                        "type": "sidebar",
                        "icon": "search",
                        "title": "Finn bakgrunnsbilde"
                    }
                ],
                "ui:fieldset": [
                    "media","imageCropdata","imageFilters"
                ],
                "media": {
                    "ui:title": "Bakgrunnsbilde"
                }
            },
            "parallaxImage": {
                "ui:layout": "media",
                "ui:buttons": [
                    {
                        "type": "sidebar",
                        "icon": "search",
                        "title": "Finn parallaxbilde"
                    }
                ],
                "media": {
                    "ui:title": "Parallaxbilde"
                }
            }        
        }
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