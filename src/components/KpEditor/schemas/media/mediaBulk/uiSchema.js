
export default {
    "ui:field": "bulkEditor",
    "ui:options": {
        "grid": true,
        "padding": 2,
        "spacing": 2,
    },
    "ui:fieldset": [
        "status",
        "content"
    ],
    "status": {
        "ui:field": "bulkString",
        "ui:title": "Status",
        "ui:help": "Sett status.",
    },
    "content": {
        "ui:fieldset": [
            "license",
            "copyright",
            "copyrightYear",
            "byline",
            "credit"
        ],
        "license": {
            "ui:field": "bulkString",
            "ui:widget": "selectLicense",
            "ui:title": "Lisens",
            "ui:help": "Velg en lisens for dette innholdet.",
        },
        "copyright": {
            "ui:field": "bulkString",
            "ui:title": "Copyright",
            "ui:help": "Beskrivelse av opphavsrett"
        },
        "copyrightYear": {
            "ui:field": "bulkString",
            "ui:title": "Copyright year",
            "ui:help": "Beskrivelse av opphavsrett"
        },
        "byline": {
            "ui:field": "bulkString",
            "ui:title": "Byline",
            "ui:help": "Fotograf, artist eller annen skaper av åndsverket",
        },
        "credit": {
            "ui:field": "bulkString",
            "ui:title": "Kreditering",
            "ui:help": "Hvordan skal verket krediteres?",
        },
    }
}