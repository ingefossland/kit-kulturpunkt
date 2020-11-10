import { getRRuleFromFormData, getRRuleText } from "./utils"

import RRulesGroupLayout from "./RRulesGroupLayout"

export default {
    "ui:layout": "icalRRules",
    "ui:options": {
        "collapsible": true
    },
    "ui:preview": {
        "select": {
            "title": "title",
            "description": "description"
        },
        prepare({schema, formData}) {

            let rrule, title;

            console.log(formData)

            if (formData.freq) {
                rrule = getRRuleFromFormData(formData)
                title = rrule && getRRuleText(rrule)
            }

            return {
                title: title,
                description: rrule
            }


        }
    },

    "ui:fieldset": [
        "frequency",
        "ends"
    ],

    "frequency": {
        "ui:title": "Repeter hver",
        "ui:layout": RRulesGroupLayout,
        "ui:options": {
            "grid": true,
            "spacing": 2,
        },
        "ui:fieldset": [
            "INTERVAL",
            "freq",
        ],
        "INTERVAL": {
            "ui:xs": 4,
        },
        "freq": {
            "ui:xs": 8,
        }
    },

    "byDate": {
        "ui:title": "Velg dato",
        "ui:layout": RRulesGroupLayout,
        "ui:options": {
            "grid": true,
            "spacing": 2,
        },

        "ui:fieldset": [
            "byMonthDay",
            "byMonth",
        ],

        "byMonthDay": {
            "ui:title": "Velg dato",
        },

        "byMonth": {
            "ui:title": "Velg måned",
        },

    },

    "bySetPos": {
        "ui:title": "Velg dag",
        "ui:layout": RRulesGroupLayout,
        "ui:options": {
            "grid": true,
            "spacing": 2,
        },

        "ui:fieldset": [
            "bySetPos",
            "byDay",
            "byMonth",
        ],

        "bySetPos": {
            "ui:title": "Velg dag",
            "ui:multiple": false
        },

        "byDay": {
            "ui:title": "Velg ukedager",
        },

        "byMonth": {
            "ui:title": "Velg måned",
        },

    },

    "byWeekday": {
        "ui:title": "Velg ukedager",
        "ui:layout": RRulesGroupLayout,

        "ui:fieldset": [
            "byDay",
        ],

        "byDay": {
            "ui:title": "Velg ukedager",
            "ui:widget": "byDay"
        }

    },
    "ends": {
        "ui:fieldset": [
            "ends",
            "until",
            "count",
        ],

        "ends": {
            "ui:title": "Avsluttes",
            "ui:widget": "radio",
            "ui:inline": true
        }

    }

}