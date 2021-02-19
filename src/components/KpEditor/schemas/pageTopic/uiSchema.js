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
            ...uiSchema.content.body,
            "ui:preview": {
                "select": {
                    "title": "title"
                },
                prepare({formData: {links = []}}) {
                    return {
                        title: links.length + " lenker"
                    }
                }
            },
            "links": {
                ...uiSchema.content.body.links,
                "items": itemsUi,
            }
        }
    }
}