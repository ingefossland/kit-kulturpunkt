export default {
    "ui:layout": "section",
    "ui:title": "Media",
    "ui:fieldset": [
        "media",
    ],
    "ui:options": {
        "collapsible": true,
        "padding": 2,
        "spacing": 2,
        "grid": true
    },
    "media": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "backgroundImage"
        ],
        "backgroundImage": {
            "ui:layout": "media",
            "ui:buttons": [
                {
                    "type": "sidebar",
                    "icon": "search",
                    "label": "Finn bakgrunnsbilde"
                }
            ],
            "ui:fieldset": [
                "media","imageCropdata","imageFilters"
            ],
            "media": {
                "ui:title": "Bakgrunnsbilde"
            }
        },
        "parallaxImage": {
            "ui:layout": "media",
            "ui:buttons": [
                {
                    "type": "sidebar",
                    "icon": "search",
                    "label": "Finn parallaxbilde"
                }
            ],
            "media": {
                "ui:title": "Parallaxbilde"
            }
        }        
    }
}