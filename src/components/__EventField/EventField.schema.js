import rrules from "./RRulesField.schema"

export default {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "date": {
            "type": "string",
            "format": "date"
        },
        "location": {
            "type": "string",
        },
        "allDay": {
            "type": "boolean",
            "default": false
        },
        "dtStart": {
            "type": "string",
            "format": "date"
        },
        "dtEnd": {
            "type": "string",
            "format": "date"
        },
        "location": {
            "type": "string",
        },

        "rrule": {
            "type": "string",
            "enum": [
                false,
                "FREQ=DAILY",
                "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
                "FREQ=WEEKLY;BYDAY=SA,SU",
                "custom"
            ],
            "enumNames": [
                "Ingen repetisjoner",
                "Hver dag",
                "Hver ukedag",
                "Hver helg",
                "Spesifiser ..."
            ],
            "default": false
        },
    },
    "dependencies": {
        "allDay": {
            "oneOf": [
                {
                    "properties": {
                        "allDay": {
                            "enum": [false]
                        },
                        "startTime": {
                            "type": "string",
                            "format": "time"
                        },
                        "endTime": {
                            "type": "string",
                            "format": "time"
                        },
                    }
                }
            ]    
        },
        "rrule": {
            "oneOf": [
                {
                    "properties": {
                        "rrule": {
                            "enum": ["custom"]
                        },
                        "rrules": rrules
                    }
                }
            ]    
        }
    }    
}