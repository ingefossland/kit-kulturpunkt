export default {
    "ui:layout": "section",
    "ui:title": "Media",
    "ui:fieldset": [
        "media",
    ],
    "ui:options": {
        "collapsible": true,
        "spacing": 2,
    },
    "media": {
        "ui:options": {
//            "grid": true,
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
                    "title": "Finn bakgrunnsbilde"
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
                    "title": "Finn parallaxbilde"
                }
            ],
            "media": {
                "ui:title": "Parallaxbilde"
            }
        }        
    }
}