export default {
    "type": "object",
    "readonly": true,
    "properties": {
        "uniqueId": {
            "type": "string"
        },
        "sourceId": {
            "type": "string"
        },
        "mediaType": {
            "type": "string"
        },
        "imageUrl": {
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                }
            }
        }
    }
}