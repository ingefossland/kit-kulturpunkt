import items from "./itemsUi"

export default {
    "ui:title": "Lenker",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            return {
                title: formData.length + " lenker"
            }
        }
    },
    "ui:options": {
        "draggable": true
    },
    "ui:dialog": {
        "query": {
            "models": "documents",
            "documentType": ["page*","article"]
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn innhold",
        },
        {
            "type": "add",
            "title": "Legg til"
        }
    ],
    "items": items
}