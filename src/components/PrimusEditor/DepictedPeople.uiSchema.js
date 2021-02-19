import person from "./Person.uiSchema"

export default {
    "ui:title": "Personer avbildet",
    "ui:field": "primusList",
    "ui:layout": "section",
    "ui:options": {
        "sortable": true,
    },
    "ui:search": {
        "placeholder": "Finn person",
        "query": {
            "entityType": "Person"
        }
    },
    "items": {
        ...person,
        "ui:layout": "primusListItem"
    }
}