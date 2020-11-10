export default {
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
        "padding": 2,
        "spacing": 2,
    },
    "title": {
        "ui:title": "Tittel"
    },
}