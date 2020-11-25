export default {
    "type": "object",
    "properties": {
        "referenceId": {
            "type": "string"
        },
        "referenceType": {
            "type": "string",
            "default": "pageLink"
        },
        "reference": {
            "type": "object",
            "properties": {
                "uniqueId": {
                    "type": "string"
                },
                "documentType": {
                    "type": "string"
                }
            }
        },
        "mediaId": {
            "type": "string"
        },
        "media": {
            "type": "object",
            "properties": {
                "uniqueId": {
                    "type": "string"
                }
            }
        },
        "imageFilters": {
            "type": "imageFilters"
        },
        "imageCropdata": {
            "type": "imageCropdata"
        },
        "imageFocalpoint": {
            "type": "imageFocalpoint"
        },
        "runningHead": {
            "type": "localizedString"
        },
        "title": {
            "type": "localizedString"
        },
        "titleColor": {
            "type": "string",
            "format": "color",
            "enum": ["black","white"],
            "default": "black"
        },
        "titleSize": {
            "type": "string",
            "enum": ["small","medium","large"],
            "default": "medium"
        },
        "description": {
            "type": "localizedString"
        },
        "top": {
            "type": "string",
            "default": 50,
            "readonly": true
        },
        "left": {
            "type": "string",
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
        "backgroundColor": {
            "type": "string",
            "format": "color",
            "enum": ["black","#7f7f7f","white"],
            "default": "#7f7f7f"
        },
        "color": {
            "type": "string",
            "format": "color",
            "enum": ["black","white"],
            "default": "black"
        },
        "skin": {
            "type": "string",
            "enum": [
                "dark",
                "light",
                "dark/light",
                "light/dark"
            ],
            "default": "dark"
        },
        "placement": {
            "type": "string",
            "enum": [
                "top-left",
                "top",
                "top-right",
                "left",
                "center",
                "right",
                "bottom-left",
                "bottom",
                "bottom-right"
            ],
            "default": "top-left"
        },
        "grid": {
            "type": "string",
            "enum": [
                "1:1",
                "1:2",
                "1:3",
                "2:1",
                "2:2",
                "2:3",
                "3:1",
                "3:2",
                "3:3",
                "4:1",
                "4:2",
                "4:3",
                "5:1",
                "5:2",
                "5:3"
            ],
            "default": "1:1"
        },
    }
}