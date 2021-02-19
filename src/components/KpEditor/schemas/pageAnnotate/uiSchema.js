import uiSchema from "../page/uiSchema"
import itemsUi from "./itemsUi"

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "header",
            "body"
        ],
        "body": {
            "ui:layout": "section",
            "ui:title": "Markeringer",
            "ui:icon": "label",
            "ui:fieldset": [
                "backgroundImage",
                "links"
            ],
            "ui:settings": [
                "annotateLayout",
                "annotateColor"
            ],
            "backgroundImage": {
                ...uiSchema.content.backgroundImage,

                "ui:fieldset": [
                    "imageAnnotations",
                    "imageFilters"
                ],
                "imageAnnotations": {
                    "ui:field": "kpAnnotateImage",
                    "ui:title": "Markeringer",
                },
                "ui:minHeight": 512,
                "ui:buttons": [
                    {
                        "type": "sidebar",
                        "icon": "search",
                        "title": "Finn bilde"
                    }
                ]

            },
            "links": {
                ...uiSchema.content.body.links,
                "ui:field": "kpAnnotateLinks",
                "items": itemsUi
            }
        }
    }
}

