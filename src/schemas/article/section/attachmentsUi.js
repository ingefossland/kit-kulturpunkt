export default {
    "ui:title": "Vedlegg",
    "ui:options": {
        "draggable": true
    },
    "ui:sidebar": {
        "query": {
            "models": "media",
            "mediaType": ["misc"]
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn vedlegg"
        },
    ],
    "items": {
        "ui:layout": "module",
        "ui:options": {
            "editable": true,
            "hideable": true
        },
        "ui:fieldset": [
            "media"
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
    }
}