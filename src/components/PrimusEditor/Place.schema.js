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
        "value": {
            "type": "string"
        },
        "label": {
            "type": "string"
        }
    }
}