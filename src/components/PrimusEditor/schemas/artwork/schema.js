import registry from "../../../registry"
const { models } = registry

export default {
    "type": "object",
    "properties": {
        "collectionId": {
            "type": "number",
        },
        "schemaId": {
            "type": "number",
            "default": 1
        },
        "locale": {
            "type": "string",
            "default": "no"
        },
        "documentType": {
            "type": "string",
            "default": "artifact"
        },
        "uniqueId": {
            "type": "string"
        },
        "title": {
            "type": "string",
            "default": "Untitled artifact"
        },
        "description": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "identifier": {
                    "type": "string"
                },
                "registrationLevel": {
                    "type": "string",
                    "enum": [
                        "single",
                        "group"
                    ],
                    "enumNames": [
                        "Enkeltverk",
                        "Gruppe"
                    ],
                    "default": "single"
                },
                "designation": {
                    "type": "object",
                    "properties": {
                        "value": {
                            "type": "string"
                        },
                        "label": {
                            "type": "string"
                        }
                    }
                },
                "titleImage": {
                    "type": "image"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "artist": models.primusPerson.schema,
                "dating": models.primusDating.schema,
                "place": models.primusPlace.schema,
                "motifType": {
                    "type": "string"
                },
                "motifDescription": {
                    "type": "string"
                },
                "depictedObjects": {
                    "type": "array",
                    "items": models.primusPerson.schema
                },
                "depictedPeople": {
                    "type": "array",
                    "items": models.primusPerson.schema
                },
                "depictedPlaces": {
                    "type": "array",
                    "items": models.primusPlace.schema
                },
                "classifications": {
                    "type": "array",
                    "items": models.primusClassification.schema
                },
                "materialAndTechniqueDescription": {
                    "type": "string"
                },
                "materials": {
                    "type": "array",
                    "items": models.primusMaterial.schema
                },
                "techniques": {
                    "type": "array",
                    "items": models.primusTechnique.schema
                },
                "colors": {
                    "type": "array",
                    "items": models.primusColor.schema
                },
                "designations": {
                    "type": "array",
                    "items": models.primusDesignation.schema
                },
                "measures": {
                    "type": "array",
                    "items": models.primusMeasure.schema
                },
                "events": {
                    "type": "array",
                    "items": models.primusEvent.schema,
                },
                "images": models.primusMedia.schema,
                "attachments": models.primusMedia.schema,
//                "media": models.primusMedia.schema
            }
        }
    }
}