import media from "./media"

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["text"]
        },
        "media": media,
        "leadtext": {
            "type": "localizedString"
        },
        "bodytext": {
            "type": "localizedString"
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