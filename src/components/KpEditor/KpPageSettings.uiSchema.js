export default {
    "ui:layout": "pageSettings",
    "ui:nav": true,
    "ui:fieldset": [
        "metadata",
    ],
    "metadata": {
        "ui:layout": "section",
        "ui:icon": "label",
        "ui:title": "Metadata",
        "ui:fieldset": [
            "documentType",
            "collectionId",
            "locale",
            "parentId",
            "parents",
            "children"
        ],
        "ui:options": {
            "spacing": 2
        },
        "collectionId": {
//            "ui:field": "documentCollectionId",
            "ui:query": {
                "collectionType": "kp"
            }
        },
        "locale": {
            "ui:field": "documentLocale"
        },
        "documentType": {
            "ui:title": "Sidetype"
        },
        "parentId": {
//            "ui:field": "documentParentId",
            "ui:title": "ParentId",
            "ui:query": {
                "documentType": "page*",
            }
        },
        "parents": {
            "ui:fieldset": [
                "parentId",
                "uniqueId",
                "id"
            ],
//            "ui:field": "documentParents",
            "ui:query": {
                "documentType": "page*",
            }
        },
        "children": {
            "ui:fieldset": [
                "uniqueId",
                "id"
            ],
//            "ui:field": "documentChildren",
            "ui:query": {
                "documentType": "page*",
            }
        }
    }
}