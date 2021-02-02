export default {
    "ui:title": "Lenker",
    "ui:options": {
        "draggable": true
    },
    "ui:buttons": [
        {
            "type": "add",
            "title": "Legg til"
        }
    ],
    "items": {
        "ui:preview": {
            "select": {
                "description": "description"
            },
            prepare({formData}) {
                return {
                    description: formData.url
                }
            }
        },
        "ui:layout": "module",
        "ui:options": {
            "editable": true,
            "hideable": true
        },
        "ui:fieldset": [
            "content",
        ],
        "content": {
            "ui:options": {
                "grid": true,
                "spacing": 2
            },
            "ui:fieldset": [
                "title",
                "url"
            ],
            "title": {
                "ui:title": "Tittel"
            },
            "url": {
                "ui:title": "URL",
            }
        }
    }
}