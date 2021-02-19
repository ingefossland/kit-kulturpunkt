import media from "./media"

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["text"]
        },
        "leadtext": {
            "type": "localizedString"
        },
        "bodytext": {
            "type": "localizedString"
        }
    }
}