export default {
    "ui:title": "Basis",
    "ui:field": "primusSection",
    "ui:fieldset": [
        "metadata",
        "artwork",
        "description",
    ],
    "metadata": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "identifier",
            "registrationLevel",
//            "designation",
        ],
        "identifier": {
            "ui:xs": 6,
            "ui:title": "Inventarnr.",
        },
        "registrationLevel": {
            "ui:xs": 6,
            "ui:title": "Registreringsnivå",
        },
        "designation": {
            "ui:xs": 6,
            "ui:title": "Betegnelse",
            "ui:field": "primusDesignation",
        },
    },
    "artwork": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "title",
            "artist",
            "dating",
        ],
        "title": {
            "ui:title": "Tittel",
            "ui:xs": 12
        },
        "artist": {
            "ui:title": "Kunstner",
            "ui:field": "primusPerson",
            "ui:xs": 6
        },
        "dating": {
            "ui:xs": 6,
            "ui:title": "Datering",
            "ui:field": "primusDating",
        },
    },
    "details": {
        "ui:options": {
            "spacing": 2
        },
        "ui:fieldset": [
            "materialDescription",
//            "techniqueDescription",
        ],
        "materialDescription": {
            "ui:title": "Teknikk og materiale"
        },
        "techniqueDescription": {
            "ui:title": "Teknikk"
        }

    },
    "description": {
        "ui:title": "Beskrivelse",
        "ui:widget": "textarea"
    },
    "keywords": {
        "ui:title": "Stikkord",
        "ui:widget": "tags"
    },
    "parentId": {
        "ui:title": "ParentId",
        "ui:field": "parentId",
        "ui:query": {
            "documentType": "event"
        }
    },
    "measure": {
        "ui:title": "Hovedmål",
        "ui:field": "primusMeasure"
    }
}