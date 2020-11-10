import rrules from "./RRulesField.uiSchema"

export default {
    "ui:options": {
        "spacing": 2
    },
    "ui:fieldset": [
        "datetime",
        "event",
        "rrules"
    ],
    "datetime": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "date",
            "startTime",
            "endTime",
            "allDay",
        ],
    },
    "event": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "title",
            "description",
            "rrule",
        ],
        "title": {
            "ui:xs": 12
        },
        "description": {
            "ui:xs": 12,
            "ui:widget": "textarea"
        },
    },


    "rrules": rrules
}