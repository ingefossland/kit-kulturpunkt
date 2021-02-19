import uiSchema from "../page/uiSchema"
//import itemsUi from "./itemsUi"

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "media": {
            ...uiSchema.content.media,
            "ui:title": "Bakgrunnsbilder",
            "ui:options": {
                "collapsible": true,
                "grid": true,
                "spacing": 2
            },
            "ui:fieldset": [
                "backgroundImage",
                "parallaxImage"
            ],
            "backgroundImage": {
                ...uiSchema.content.media.backgroundImage,
                "ui:xs": 6
            },
            "parallaxImage": {
                ...uiSchema.content.media.parallaxImage,
                "ui:xs": 6
            }
        }
    }
    
}