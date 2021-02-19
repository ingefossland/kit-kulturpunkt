export default {
    "ui:title": "Datering",
    "ui:help": "Datering [fra-til]",
    "ui:options": {
        "grid": true,
        "spacing": 2,
        "collapsible": true
    },
    "ui:fieldset": [
        "dtStart",
        "dtEnd",
        "basis"
    ],
    "value": {
        "ui:title": "Datering",
    },
    "dtStart": {
        "ui:xs": 6,
        "ui:title": "Fra",
        "ui:variant": "standard"
    },
    "dtEnd": {
        "ui:xs": 6,
        "ui:title": "Til",
        "ui:variant": "standard"
    },
    "basis": {
        "ui:xs": 12,
        "ui:title": "Dateringrunnlag",
        "ui:widget": "textarea",
        "ui:variant": "standard"
    }

}