export default {
    "ui:field": "rrules",
    "ui:options": {
        "spacing": 2
    },

    "ui:fieldset": [
        "header",
        "body",
        "footer"
    ],

    "header": {
        "ui:title": "Repeat every",
        "ui:fieldset": [
            "INTERVAL",
            "FREQ"
        ],
        "ui:options": {
            "grid": true,
            "spacing": 2,
        },

        "INTERVAL": {
            "ui:title": "Interval",
            "ui:xs": 3
        },
    
        "FREQ": {
            "ui:title": "Frekvens",
            "ui:xs": 9
        },
    
    },

    "body": {
        "ui:fieldset": [
            "BYDAY",
            "BYMONTH",
            "BYMONTHDAY"
        ],
        "BYDAY": {
            "ui:title": "Velg ukedager",
            "ui:widget": "byDay"
        },
        "BYMONTH": {
            "ui:title": "Velg måneder",
            "ui:widget": "byMonth"
        },
        "BYMONTHDAY": {
            "ui:title": "Velg dager",
            "ui:widget": "byMonthDay"
        }
    },


    "footer": {
        "ui:fieldset": [
            "ENDS",
            "UNTIL",
            "COUNT"
        ],

        "ENDS": {
            "ui:title": "Avsluttes",
            "ui:widget": "radio",
            "ui:inline": true,
        },

        "COUNT": {
            "ui:suffix": "occurences"
        }



    }



}