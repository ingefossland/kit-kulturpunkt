export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["links"]
        },
        "links": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    }
                }
            }
        }
    }
}