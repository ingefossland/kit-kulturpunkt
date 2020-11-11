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
        "title",
        "leadtext",
        "bodytext"
    ],
    "ui:options": {
        "expanded": true,
        "collapsible": true,
        "spacing": 2,
    },
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
}