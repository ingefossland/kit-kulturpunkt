export default {
    "type": "object",
    "properties": {
        "mediaId": {
            "type": "string"
        },
        "media": {
            "type": "object",
            "properties": {
                "mediaType": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "content": {
            "type": "object",
            "properties": {
                "creator": {
                    "type": "string"
                },
                "headline": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "credit": {
                    "type": "string"
                },
                "license": {
                    "type": "string"
                },
            }
        },
        "imageCropdata": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "number",
                    "readonly": true
                },
                "y": {
                    "type": "number",
                    "readonly": true
                },
                "width": {
                    "type": "number",
                    "readonly": true
                },
                "height": {
                    "type": "number",
                    "readonly": true
                },
                "rotate": {
                    "type": "number",
                    "readonly": true,
                }
            }
        },
        "imageAnnotations": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "top": {
                        "type": "number",
                        "default": 50,
                        "readonly": true
                    },
                    "left": {
                        "type": "number",
                        "default": 50,
                        "readonly": true
                    },
                    "x": {
                        "type": "number",
                        "default": 0,
                        "readonly": true
                    },
                    "y": {
                        "type": "number",
                        "default": 0,
                        "readonly": true
                    },
                    "radius": {
                        "type": "number",
                        "minimum": 1,
                        "maximum": 100,
                        "default": 1
                    },
                    "title": {
                        "type": "string",
                    },
                    "description": {
                        "type": "string",
                    }
                }
            }
        }
    }
}