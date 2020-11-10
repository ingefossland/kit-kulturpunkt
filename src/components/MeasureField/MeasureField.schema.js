export default {
    "type": "object",
    "properties": {
        "text": {
            "type": "string"
        },
        "list": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "width": {
                        "type": "number"
                    },
                    "height": {
                        "type": "number"
                    },
                    "depth": {
                        "type": "number"
                    },
                    "unit": {
                        "type": "string"
                    }
                }
            }
        },

    }
}