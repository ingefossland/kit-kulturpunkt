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
                        title: links && links.length + " media"
                    }
                }
            },
            "links": {
                ...uiSchema.content.body.links,
                "ui:dialog": {
                    "query": {
                        "models": "media",
                        "mediaType": ["image","video","audio"]
                    }
                },
                "ui:buttons": [
                    {
                        "type": "sidebar",
                        "icon": "search",
                        "title": "Finn media",
                    },
                    {
                        "type": "upload",
                        "title": "Last opp"
                    }
                ],
                "ui:sortable": true,
                "items": itemsUi
            },
            "ui:settings": [
            ]
        }
    }
}