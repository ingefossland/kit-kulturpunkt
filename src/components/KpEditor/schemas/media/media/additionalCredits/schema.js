export default {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "type": {
                "type": "string",
                "enum": [
                    "undefined",
                    "photographer",
                    "artist",
                    "author",
                    "director",
                    "producer",
                    "voice",
                    "owner",
                    "rightsmanager"
                ],
                "enumNames": [
                    "Ikke spesifisert",
                    "Fotograf",
                    "Kunstner",
                    "Forfatter",
                    "Regissør",
                    "Produsent",
                    "Stemme",
                    "Eier",
                    "Rettighetsforvalter"
                ],
                "default": "undefined"
            },
            "name": {
                "type": "string"
            }
        }
    }
}
