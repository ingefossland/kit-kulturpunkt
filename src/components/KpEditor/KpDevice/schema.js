export default {
    "type": "object",
    "properties": {
        "locale": {
            "type": "string",
            "default": "no"
        },
        "documentType": {
            "type": "string",
            "default": "device"
        },
        "id": {
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "deviceId": {
                    "type": "number"
                },
                "deviceTitle": {
                    "type": "string"
                },
                "deviceType": {
                    "type": "string",
                    "enum": ["windows","ipad"],
                    "enumNames": ["Windows","iPad"]
                },
                "serialNumber": {
                    "type": "string",
                },
                "placement": {
                    "type": "string",
                },
                "backgroundImage": {
                    "type": "image",
                    "focalpoint": true
                },
                "startPageId": {
                    "type": "string",
                    "readonly": true
                },
                "hasPages": {
                    "type": "array",
                    "items": {
                        "type": "reference",
                        "documentType": "page",
                        "referenceType": "deviceHasPages",
                        "_reverseReferenceType": "pageIsPartOf",
                        "_reverseReference": "isPartOf[]",
                        "properties": {
                            "content": {
                                "type": "object",
                                "properties": {
                                    "icon": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}