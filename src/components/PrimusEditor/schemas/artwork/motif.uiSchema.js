export default {
    "ui:field": "primusSection",
    "ui:title": "Motiv",
    "ui:fieldset": [
        "motifType",
        "motifDescription",
//        "dating",
        "depictedPeople",
        "depictedPlaces",
//        "depictedObjects"
    ],
    "motifType": {
        "ui:title": "Motivtype"
    },
    "motifDescription": {
        "ui:title": "Motivbeskrivelse",
        "ui:widget": "textarea"
    },
    "depictedPeople": {
        "ui:title": "Personer avbildet",
        "ui:field": "primusPeopleTags"        
    },
    "depictedPlaces": {
        "ui:title": "Steder avbildet",
        "ui:field": "primusPlaceTags"        
    }
}