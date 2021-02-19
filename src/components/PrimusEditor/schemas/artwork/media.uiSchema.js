export default {
    "ui:field": "primusSection",
    "ui:title": "Media",
    "ui:fieldset": [
        "images",
        "attachments"
    ],
    "images": {
        "ui:field": "primusMedia",
        "ui:title": "Bilder",
        "ui:preview": {
            "select": {
                "title": "title",
                "description" : "description",
            },
            prepare({formData = [], formContext}) {

                const title = formData.length + " bilder"
    
                return {
                    title: title,
                }
            }
        },
        "ui:options": {
            "collapsible": true
        },
    },
    "attachments": {
        "ui:field": "primusMedia",
        "ui:title": "Vedlegg",
        "ui:preview": {
            "select": {
                "title": "title",
                "description" : "description",
            },
            prepare({formData = [], formContext}) {

                const title = formData.length + " vedlegg"
    
                return {
                    title: title,
                }
            }
        },
        "ui:options": {
            "collapsible": true
        },
    }
}