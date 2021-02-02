import annotateLinks from "../annotateLinks/uiSchema"
import annotateImage from "../annotateImage/uiSchema"

export default {
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