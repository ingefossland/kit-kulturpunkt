export default {
    "ui:options": {
        "spacing": 2,
    },
    "ui:fieldset": [
        "credit",
        "additionalCredits"
    ],
    "credit": {
        "ui:title": "Kreditering",
        "ui:help": "Opphavsrett, person eller organisasjon",
    },
    "additionalCredits": {
        "ui:title": "Kreditering",
        "ui:buttons": [
            {
                "title": "Legg til kreditering"
            }
        ],
        "items": {
            "ui:options": {
                "grid": true,
                "spacing": 2,
            },
            "type": {
                "ui:xs": 6,
                "ui:title": "Type",
                "ui:widget": "select"
            },
            "name": {
                "ui:xs": 6,
                "ui:title": "Navn",
            }
        }
    }
}