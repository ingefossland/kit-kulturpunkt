export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["quote"]
        },
        "quote": {
            "type": "localizedString"
        },
        "cite": {
            "type": "string"
        }
    }
}