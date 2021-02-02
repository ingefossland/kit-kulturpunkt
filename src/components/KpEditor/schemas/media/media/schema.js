import additionalCredits from "./additionalCredits/schema"

export default {
    "type": "object",
    "properties": {
        "uniqueId": {
            "type": "string"
        },
        "mediaType": {
            "type": "string"
        },
        "filename": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "readonly": true
                },
                "title": {
                    "type": "localizedString"
                },
                "description": {
                    "type": "localizedString"
                },
                "keywords": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": [],
                    },
                    "uniqueItems": true
                },
                "license": {
                    "type": "string"
                },
                "credit": {
                    "type": "string"
                },
                "additionalCredits": additionalCredits,
            },
            "dependencies": {
                "license": {
                    "oneOf": [
                        {
                            "properties": {
                                "license": {
                                    "enum": ["copyright"]
                                },
                                "copyright": {
                                    "type": "string"
                                },
                                "copyrightYear": {
                                    "type": "number"
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}