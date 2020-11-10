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
        "documentType": {
            "ui:title": "Sidetype"
        },
        "parentId": {
            "ui:field": "parentId",
            "ui:documentType": "page*",
//            "ui:widget": "autocomplete",
            "ui:title": "ParentId"
        }
    }
}