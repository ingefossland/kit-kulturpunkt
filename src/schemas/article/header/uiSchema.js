export default {
    "ui:fieldset": [
        "titleImage",
        "content",
    ],
    "ui:layout": "section",
    "ui:options" : {
        "collapsible": true,
        "expanded": true,
        "grid": true,
        "spacing": 2
    },
    "ui:title": "Header",
    "ui:preview": {
        "select": {
            "description": "description"
        },
        prepare({formData, formContext}) {
            const localeId = "locale:" + formContext.currentLocale
            const description = formData.title && formData.title[localeId]  
    
            return {
                description: description
            }
    
        }
    },
    "titleImage": {
        "ui:xs": 4,
        "ui:field": "media",
//        "ui:minHeight": 240,
        "ui:options": {
            "editable": true,
            "hotspot": true
        },
        "ui:buttons": [
            {
                "title": "Finn hovedbilde",
                "icon": "search",
                "type": "sidebar"
            },
        ],
        "ui:fieldset": [
            "media",
            "content",
        ],
        "content": {
            "ui:title": "Innhold",
            "ui:options": {
                "grid": true,
                "padding": 2,
                "spacing": 2
            },
            "ui:fieldset": [
                "headline",
                "caption",
            ],
            "headline": {
                "ui:title": "Bildetekst, overskrift"
            },
            "caption": {
                "ui:title": "Bildetekst",
                "ui:widget": "textarea"
            }
        }
    },
    "content": {
        "ui:xs": 8,
        "ui:fieldset": [
            "title",
            "leadtext",
            "author"
        ],
        "ui:options": {
            "spacing": 2,
        },
        "title": {
            "ui:title": "Tittel"
        },
        "leadtext": {
            "ui:title": "Ingress",
            "ui:widget": "textarea"
        },
        "author": {
            "fieldset": [
                "name",
                "description"
            ],
            "name": {
                "ui:title": "Forfatter"
            },
            "description": {
                "ui:title": "Forfatter, beskrivelse",
            },
        }        
    }

}