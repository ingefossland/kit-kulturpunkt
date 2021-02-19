import place from "./Place.uiSchema"

export default {
    "ui:title": "Steder avbildet",
    "ui:field": "primusList",
    "ui:layout": "section",
    "ui:options": {
        "sortable": true,
    },
    "ui:search": {
        "placeholder": "Finn sted",
        "query": {
            "entityType": "Place"
        }
    },
    "items": {
        ...place,
        "ui:layout": "primusListItem"
    }
}