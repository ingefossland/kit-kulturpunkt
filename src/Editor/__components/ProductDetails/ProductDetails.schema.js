export default {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "priceCategory": {
            "type": "string",
            "enum": [
                "service",
                "resale",
                "self-produced",
            ],
            "enumNames": [
                "Tjeneste",
                "Vare (for videresalg)",
                "Vare (egenprodusert)",
            ],
            "default": "service"
        },
        "vatRate": {
            "type": "number",
            "enum": [
                25,
                15,
                12,
                6,
                0
            ],
            "enumNames": [
                "25%",
                "15%",
                "12%",
                "6%",
                "Fritatt"
            ],
            "default": 25
        },
        "vatPrice": {
            "type": "number",
            "default": 0,
            "readonly": true
        },
        "netPrice": {
            "type": "number",
            "default": 0,
            "readonly": true
        },
        "price": {
            "type": "number",
            "default": 0
        }
    }
}