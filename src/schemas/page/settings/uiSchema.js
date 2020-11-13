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
            "parentId"
        ],
        "ui:options": {
            "spacing": 2
        },
        "documentType": {
            "ui:title": "Sidetype"
        },
        "parentId": {
            "ui:field": "parentId",
//            "ui:widget": "autocomplete",
            "ui:title": "ParentId",
            "ui:query": {
                "documentType": "page*",
            }
        }
    }
}