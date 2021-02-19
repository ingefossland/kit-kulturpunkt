import object from "./Object.uiSchema"

export default {
    "ui:title": "Objekter avbildet",
    "ui:field": "primusList",
    "ui:layout": "section",
    "ui:options": {
        "sortable": true,
    },
    "ui:search": {
        "placeholder": "Finn object",
        "query": {
        }
    },
    "items": {
        ...object,
        "ui:layout": "primusListItem"
    }
}