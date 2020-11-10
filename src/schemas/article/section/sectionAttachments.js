import attachments from "./attachments"

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["attachments"]
        },
        "attachments": attachments
    }
}