import layout from './schemaSectionMediaLayout';

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["references"]
        },
        "sectionLayout": layout,
        "leadtext": {
            "type" : "localizedString"
        },
        "referenceList": {
            "type": "array",
            "items": {
                "type": "reference",
                "documentType": "article",
                "referenceType": "article"
            }
        },
        "bodytext": {
            "type" : "localizedString"
        }
    }
}