import section from "../section/uiSchema";

export default {
    "ui:fieldset": [
        "sections"
    ],
    "sections": {
        "ui:layout": "section",
        "ui:title": "Innhold",
        "ui:preview": {
            "select": {
                "description": "description" 
            },
            prepare({formData = []}) {
    
                let description;
    
                if (formData.length && formData.length === 1) {
                    description = formData.length + " seksjon"
                } else if (formData.length) {
                    description = formData.length + " seksjoner"
                } else {
                    description = "Ingen seksjoner"
                }
    
                return {
                    "description": description
                }
            }
        },
        "ui:options" : {
            "collapsible": true,
            "expanded": true,
            "draggable": true,
            "spacing": 2,
        },
        "ui:buttons" : [
            {
                "icon": "subject",
                "title" : "Tekst",
                "item" : {
                    "sectionType" : "text"
                }
            },
            {
                "icon": "insert_photo",
                "title" : "Media",
                "item" : {
                    "sectionType" : "media"
                }
            },
            {
                "icon": "fingerprint",
                "title" : "DM",
                "item" : {
                    "sectionType" : "dm"
                }
            },
            {
                "icon": "insert_link",
                "title" : "Lenker",
                "item" : {
                    "sectionType" : "links"
                }
            },
            {
                "icon": "attach_file",
                "title" : "Vedlegg",
                "item" : {
                    "sectionType" : "attachments"
                }
            },
            {
                "icon": "format_quote",
                "title" : "Sitat",
                "item" : {
                    "sectionType" : "quote"
                }
            }
        ],
        "items": section
    }
}