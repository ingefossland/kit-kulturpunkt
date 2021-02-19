export default {
    "ui:preview": {
        "select": {
            "title": "title",
            "description" : "description",
        },
        prepare({formData: { eventType, dating}, formContext}) {
            const title = eventType && eventType.value
            const description = dating && dating.value

            return {
                title: title,
                description: description,
            }
        }
    },
    "ui:title": "Hendelse",
    "ui:fieldset": [
        "eventType",
        "dating",
        "description",
        "people",
        "places"
    ],
    "ui:options": {
        "grid": true,
        "spacing": 2
    },
    "eventType": {
        "ui:field": "primusEventType",
        "ui:xs": 6,
    },
    "dating": {
        "ui:xs": 6,
        "ui:field": "primusDating",
    },
    "title": {
        "ui:xs": 12,
        "ui:title": "Tittel"
    },
    "description": {
        "ui:xs": 12,
        "ui:title": "Beskrivelse",
        "ui:widget": "textarea"
    },
    "people": {
        "ui:xs": 12,
        "ui:field": "primusPeopleTags",
        "ui:title": "Relaterte personer",
    },
    "places": {
        "ui:xs": 12,
        "ui:field": "primusPlaceTags",
        "ui:title": "Relaterte steder",
    }
}