export default {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "mediaId": {
                "type": "string",
                "readonly": true
            },
            "media": {
                "type": "object",
                "properties": {
                    "mediaType": {
                        "type": "string",
                        "default": "audio"
                    },
                    "locale": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "filename": {
                        "type": "string",
                        "readonly": true
                    },
                    "mimeType": {
                        "type": "string",
                        "readonly": true
                    }
                }
            }
        }
    }
}