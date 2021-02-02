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
        "draggable": true,
        "collapsible": true,
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn tema"
        },
        {
            "title": "Legg til"
        }
    ]
}