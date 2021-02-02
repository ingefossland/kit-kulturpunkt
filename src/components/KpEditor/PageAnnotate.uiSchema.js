import uiSchema from "./KpPage.uiSchema"
import annotateLinks from "./KpAnnotateLinks.uiSchema"
import annotateImage from "./KpAnnotateImage.uiSchema"

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
            "backgroundImage": annotateImage,
            "links": annotateLinks
        }
    }
}