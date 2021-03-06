export default {
    "type": "object",
    "readonly": true,
    "properties": {
        "headline": {
            "type": "string"
        },
        "caption": {
            "type": "string"
        },
        "captionWriter": {
            "type": "string"
        },
        "credit": {
            "type": "string"
        },
        "keywords": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [],
            },
            "uniqueItems": true
        },
        "bylineTitle": {
            "type": "string"
        },
        "byline": {
            "type": "string"
        },
        "copyright": {
            "type": "string"
        },
        "dateCreated": {
            "type": "string"
        }
        /*
        "locationShown": {
            "type": "string"
        },
        "locationCreated": {
            "type": "string"
        },
        "creditLine": {
            "type": "string"
        },
        "creator": {
            "type": "string"
        },
        "creatorJobtitle": {
            "type": "string"
        },
        "creatorContactInfo": {
            "type": "string"
        },
        "copyrightNotice": {
            "type": "string"
        },
        "copyrightOwner": {
            "type": "string"
        },
        "license": {
            "type": "string"
        },
        "instructions": {
            "type": "string"
        }
        */
    }
}