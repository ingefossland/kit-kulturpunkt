export default {
    "ui:title": "Media",
    "ui:options": {
        "draggable": true
    },
    "ui:sidebar": {
        "query": {
            "models": "media",
            "mediaType": ["image","video/*","audio/*","youtube","vimeo","sketchfab"]
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn media"
        }
    ],
    "items": {
        "ui:layout": "module",
        "ui:options": {
            "editable": true,
            "hideable": true
        },
        "ui:settings": [
            "mediaSize",
            "mediaFormat"
        ],
        "ui:fieldset": [
            "content",
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