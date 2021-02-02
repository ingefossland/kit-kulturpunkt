import schema from "../page/schema"
export default {
    ...schema,
    "properties": {
        ...schema.properties,
        "content": {
            ...schema.properties.content,
            "properties": {
                ...schema.properties.content.properties,
                "backgroundImage": {
                    "type": "image",
                    "cropdata": true,
                    "annotations": true,
                    "filters": ["opacity"],
                }
            }
        }
    }
}