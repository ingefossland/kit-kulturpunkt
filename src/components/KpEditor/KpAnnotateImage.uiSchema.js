import KpAnnotateImageField from "./KpAnnotateImageField"

export default {
    "ui:fieldset": [
        "imageAnnotations",
//        "imageCropdata",
//        "imageFocalpoint",
        "imageFilters"
    ],
    "imageAnnotations": {
        "ui:field": KpAnnotateImageField,
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
}