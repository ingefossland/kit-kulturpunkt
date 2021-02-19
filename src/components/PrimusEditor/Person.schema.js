import role from "./PersonRole.schema"

export default {
    "type": "object",
    "properties": {
        "status": {
            "type": "string",
            "enum": [
                "certain",
                "uncertain"
            ],
            "enumNames": [
                "Sikker",
                "Usikker"
            ]
        },
        "role": role,
        "value": {
            "type": "string"
        },
        "label": {
            "type": "string"
        }
    }
}