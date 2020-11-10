import linkItem from "./uiPageLinksItem"

export default {
    "ui:options": {
        "draggable": true
    },
    "ui:buttons": [
        {
            "type": "sidebar/link/reference",
            "documentType": [
                "page",
                "article"
            ],
            "icon": "search",
            "label": "Finn side"
        },
        {
            "type": "sidebar/link/media",
            "mediaType": [
                "image",
                "article"
            ],
            "icon": "search",
            "label": "Finn media"
        },
        {
            "type": "add",
            "label": "Legg til"
        }
    ],
    "items": linkItem
}