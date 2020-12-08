import pageLinks from "../pageLinks/uiPageLinks"

export default {
    "ui:field": "kioskPage",
    "ui:layout": "pageContent",
    "ui:fieldset": [
        "pageHeader",
        "pageMedia",
        "pageContent"
    ],
    "pageHeader": {
        "ui:layout": "section",
        "ui:title": "Generelt",
        "ui:preview": {
            "select": {
                "description": "description"
            },
            prepare({formData, formContext}) {
                const { pageTitle } = formData;

                const localeId = "locale:" + formContext.currentLocale
                const description = pageTitle && pageTitle[localeId]

                return {
                    description: description
                }
    
            }
        },
        "ui:fieldset": [
            "pageImage",
            "pageContent",
        ],
        "ui:options": {
            "expanded": true,
            "collapsible": true,
            "padding": 2,
            "spacing": 2,
            "grid": true
        },
        "pageImage": {
            "ui:gridCols": 6,
            "ui:layout": "media",
            "ui:format": "1:1",
            "ui:buttons": [
                {
                    "type": "upload",
                    "label": "Upload"
                },
                {
                    "type": "sidebar",
                    "label": "Finn bilde"
                }
            ]

        },
        "pageContent": {
            "ui:gridCols": 6,
            "ui:options": {
                "spacing": 2,
            },
            "ui:fieldset": [
                "pageTitle",
                "pageType",
            ],
            "pageTitle": {
                "ui:title": "Tittel"
            },
            "pageType": {
                "ui:title": "Sidetype"
            }
        }

    },
    "pageMedia": {
        "ui:layout": "section",
        "ui:title": "Bilder",
        "ui:options": {
            "collapsible": true,
        },
        "ui:fieldset": [
            "annotateImage",
            "backgroundImage",
            "parallaxImage"
        ],
        "annotateImage": {
//            "ui:layout": "kioskAnnotateImage",
            "ui:options": {
                "imageAnnotations": true
            },
            "ui:mediaFormat": "4:1",
            "ui:buttons": [
                {
                    "type": "upload",
                    "label": "Upload"
                },
                {
                    "type": "sidebar",
                    "label": "Finn bilde"
                }
            ]
        },
        "backgroundImage": {
            "ui:layout": "media",
            "ui:grid": 12,
            "ui:mediaFormat": "2:1",
            "ui:buttons": [
                {
                    "type": "upload",
                    "label": "Upload"
                },
                {
                    "type": "sidebar",
                    "label": "Finn bilde"
                }
            ]
        },
        "parallaxImage": {
            "ui:layout": "media",
            "ui:grid": 6,
            "ui:mediaFormat": "4:1",
            "ui:buttons": [
                {
                    "type": "upload",
                    "label": "Upload"
                },
                {
                    "type": "sidebar",
                    "label": "Finn bilde"
                }
            ]
        }
    },
    "pageContent": {
        "ui:layout": "section",
        "ui:title": "Innhold",
        "ui:icon": "link",
        "ui:fieldset": [
            "pageLinks"
        ],
        "pageLinks": pageLinks
    },
}