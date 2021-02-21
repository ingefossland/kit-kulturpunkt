export default {
    "type": "object",
    "properties": {
        "documentType": {
            "type": "string",
            "default": "object"
        },
        "collectionId": {
            "type": "number",
        },
        "locale": {
            "type": "string",
            "default": "no"
        },
        "schemaId": {
            "type": "number",
            "default": 1
        },
        "title": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "localizedString"
                }
            }
        }
    }
}