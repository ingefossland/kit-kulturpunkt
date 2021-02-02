export default {
    "ui:field": "kioskPageLink",
    "ui:layout": "kioskLink",
    "ui:options": {
        "editable": true
    },
    "ui:nav": true,
    "ui:fieldset": [
        "linkPreview"
    ],
    "ui:settings": [
        "size",
        "radius",
        "skin",
        "grid",
        "placement"
    ],
    "ui:preview": {
        "select": {
            "imageUrl": "imageUrl",
            "title": "title",
            "description": "description",
            "label": "label"
        },
        prepare({formData, formContext}) {
//            const linkData = formData && formContext && formContext.linkData;
            const { imageUrl, label, title, description } = formData

            return {
                imageUrl: imageUrl,
                title: title,
                description: description,
                label: label
            }

        }
    },
    "imageFilters": {
        "ui:title": "Filters",
        "ui:field": "imageFilters"
    },
    "imageCropdata": {
        "ui:title": "Crop",
        "ui:field": "imageCropdata"
    },
    "imageFocalpoint": {
        "ui:title": "Fokuspunkt",
        "ui:field": "imageFocalpoint"
    },
    "linkPreview": {
        "ui:title": "Innhold",
        "ui:layout": "kioskLinkPreview",
        "ui:fieldset": [
            "linkMedia",
            "linkContent",
        ],
        "linkMedia": {
            "ui:cols": 1,
            "ui:layout": "kioskLinkMedia",
            "ui:format": "1:1",
            "ui:buttons": [
                "upload",
                "sidebar"
            ],
        },
        "linkContent": {
            "ui:cols": 2,
            "ui:fieldset": [
                "linkBody",
                "linkReference",
            ],
            "linkReference": {
                "ui:layout": "kioskLinkReference",
                "ui:options": {
                    "editable": true,
                    "deletable": true,
                    "restorable": true
                }
            },
            "linkBody": {
                "ui:fieldset": [
                    "title",
                    "description"
                ],
                "description": {
                    "ui:widget": "textarea"
                }
            }   
        }
    }
}