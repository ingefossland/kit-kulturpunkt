import uiSchema from "./KpPage.uiSchema"
import links from "./PageMapLinks.uiSchema"

export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "body": {
            ...uiSchema.content.body,
            "links": links,
            "ui:settings": [
                "mapLayout",
            ]
        }
    }
}