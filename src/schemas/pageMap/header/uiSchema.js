export default {
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
//        "titleImage",
        "title",
        "leadtext",
        "bodytext"
    ],
    "ui:options": {
        "expanded": true,
        "collapsible": true,
        "spacing": 2,
        "grid": true
    },
    "title": {
        "ui:title": "Tittel"
    },
    "titleImage": {
        "ui:layout": "media",
        "ui:buttons": [
            {
                "type": "sidebar",
                "icon": "search",
                "label": "Finn hovedbilde"
            }
        ],
        "ui:fieldset": [
            "media"
        ],
        "media": {
            "ui:title": "Hovedbilde"
        }

    },
    "leadtext": {
        "ui:title": "Ingress",
        "ui:widget": "textarea"
    },
    "bodytext": {
        "ui:title": "Brødtekst",
        "ui:widget": "textarea"
    }
}