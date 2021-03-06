import section from './section/schema'

export default {
    "type": "object",
    "properties": {
        "documentType": {
            "type": "string",
            "default": "article"
        },
        "collectionId": {
            "type": "number",
        },
        "locale": {
            "type": "string",
            "default": "no"
        },
        "schemaId": {
            "type": "number",
            "default": 1
        },
        "title": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "importId": {
                    "type": "string",
                },
                "location": {
                    "type": "object",
                    "properties": {
                        "lat": {
                            "type": "number",
                            "readonly": true
                        },
                        "lng": {
                            "type": "number",
                            "readonly": true
                        },
                        "zoom": {
                            "type": "number",
                            "readonly": true
                        }
                    }
                },
                "keywords": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": [],
                    },
                    "uniqueItems": true
                },
                "license": {
                    "type": "string"
                },
                "titleImage": {
                    "type": "image",
                    "properties": {
                        "content": {
                            "type": "object",
                            "properties": {
                                "headline": {
                                    "type": "localizedString"
                                },
                                "caption": {
                                    "type": "localizedString"
                                }
                            }
                        }
                    }
                },
                "title": {
                    "type": "localizedString"
                },
                "leadtext": {
                    "type": "localizedString"
                },
                "author": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "description": {
                            "type": "string"
                        }
                    }
                },
                "bodytext": {
                    "type": "localizedString"
                },
                "sections" : {
                    "type": "array",
                    "items": section
                },
                "isPartOf": {
                    "type": "array",
                    "items": {
                        "type": "reference",
                        "documentType": "topic",
                        "referenceType": "articleIsPartOf",
                        "_reverseReferenceType": "topicHasArticles",
                        "_reverseReference": "hasArticles[]"
                    }
                }
            }
        }
    }
}