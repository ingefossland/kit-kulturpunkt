import uiSchema from "../../page/pageMedia/uiSchema"

export default {
    ...uiSchema,
    "ui:title": "Bakgrunnsbilder",
    "media": {
        ...uiSchema.media,
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "ui:fieldset": [
            "backgroundImage",
            "parallaxImage"
        ],
        "backgroundImage": {
            ...uiSchema.media.backgroundImage,
            "ui:xs": 6
        },
        "parallaxImage": {
            ...uiSchema.media.parallaxImage,
            "ui:xs": 6
        }
    }
}