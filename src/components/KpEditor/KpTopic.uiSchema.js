import links from "./KpLinks.uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:collapsible": true,
    "ui:fieldset": [
        "content",
        "settings"
    ],
    "content": {
        "ui:layout": "pageContent",
        "ui:fieldset": [
            "header",
            "body"
        ],
        "header": {
            "ui:layout": "section",
            "ui:title": "Tema",
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
                "titleImage",
                "content"
            ],
            "ui:options": {
                "expanded": true,
                "collapsible": true,
                "grid": true,
                "spacing": 2,
            },
            "titleImage": {
                "ui:xs": 4,
                "ui:layout": "media",
                "ui:buttons": [
                    {
                        "type": "sidebar",
                        "icon": "search",
                        "title": "Finn hovedbilde"
                    }
                ],
                "ui:fieldset": [
                    "media"
                ],
                "media": {
                    "ui:title": "Hovedbilde"
                }
        
            },
            "content": {
                "ui:xs": 8,
                "ui:options": {
                    "spacing": 2,
                },
                "ui:fieldset": [
                    "title",
                    "leadtext",
                    "bodytext"
                ],
                "title": {
                    "ui:title": "Tittel"
                },
                "leadtext": {
                    "ui:title": "Ingress",
                    "ui:widget": "textarea"
                },
                "bodytext": {
                    "ui:title": "Brødtekst",
                    "ui:widget": "textarea"
                }
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
    },
}