import status from "../media/status/schema"

export default {
    "type": "object",
    "properties": {
        "status": status,
        "content": {
            "type": "object",
            "properties": {
                "license": {
                    "type": "string"
                },
                "byline": {
                    "type": "string"
                },
                "credit": {
                    "type": "string"
                }
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