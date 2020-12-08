export default {
    "ui:field": "pageSettings",
    "ui:nav": true,
    "ui:fieldset": [
        "metadata",
        "geocoder",
    ],
    "metadata": {
        "ui:layout": "section",
        "ui:icon": "label",
        "ui:title": "Metadata",
        "ui:fieldset": [
            "content"
        ],
        "content": {
            "ui:fieldset": [
                "keywords",
                "license",
                "location"
            ],
            "keywords": {
                "ui:widget": "tags",
                "ui:title": "Nøkkelord",
                "ui:help": "Beskrivende stikkord.",
            },
            "license": {
//                "ui:widget": "selectLicense",
                "ui:title": "Lisens",
                "ui:help": "Velg en lisens for dette innholdet.",
            },
            "location": {
                "ui:options": {
                    "grid": true,
                    "spacing": 2,
                },
                "ui:fieldset": [
                    "map",
                    "info"
                ],
                "map": {
                    "ui:fieldset": [
                        "lat",
                        "lng",
                        "zoom"
                    ],
                    "ui:options": {
                        "minWidth": 200,
                        "minHeight": 200
                    },
                    "ui:field": "kpGeopoint",
                    "ui:layout": "kpGeopoint",
                    "ui:overlay": {
                        "template": "kpGeocoder"
                    }
                },
                "info": {
                    "ui:options": {
                        "spacing": 2,
                    },
                    "ui:fieldset": [
                        "lat",
                        "lng",
                        "zoom"
                    ],
                }
            }
        }
    },
    "geocoder": {
        "ui:layout": "section",
        "ui:title": "Lokasjon",
        "ui:icon": "near_me",
        "ui:options": {
            "position": "absolute",
            "padding": 2,
            "grid": false
        },
        "ui:fieldset": [
            "content"
        ],
        "content": {
            "ui:fieldset": [
                "location"
            ],
            "location": {
                "ui:field": "kpGeopoint",
                "ui:layout": "kpGeocoder",
            }
        }
    }
}