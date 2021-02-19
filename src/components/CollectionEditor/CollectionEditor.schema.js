import theme from "../ThemeEditor/ThemeEditor.schema"

export default {
    "type": "object",
    "properties": {
        "modelName": {
            "type": "string",
            "default": "collections",
            "readOnly": true
        },
        "collectionType": {
            "type": "string",
            "default": "primus",
            "readOnly": true
        },
        "name": {
            "type": "string",
            "readOnly": true
        },
        "title": {
            "type": "string"
        },
        "siteId": {
            "type": "number"
        },
        "content": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "readOnly": true
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "siteId": {
                    "type": "number"
                },
                "theme": theme,
            }
        }
    }
}