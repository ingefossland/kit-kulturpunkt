export default {
    "ui:layout": "section",
    "ui:title": "Er en del av",
    "ui:preview": {
        "select": {
            "description": "description" 
        },
        prepare({formData = []}) {

            let description;

            if (formData.length) {
                description = formData.length + " tema"
            } else {
                description = "Ingen tema"
            }

            return {
                "description": description
            }
        }
    },
    "ui:options" : {
        "collapsible": true,
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "label": "Finn tema"
        },
        {
            "label": "Legg til"
        }
    ]
}