export default {
    "ui:title": "Referanser",
    "ui:options": {
        "draggable": true
    },
    "ui:sidebar": {
        "query": {
            "models": "documents",
            "documentType": "ekultur"
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn referanse"
        },
    ],
    "items": {
        "ui:layout": "module",
        "ui:preview": {
            "select": {
                "imageUrl": "imageUrl",
                "title": "title"
            },
            prepare({formData}) {
                const { imageUrl, title } = formData.reference;

                return {
                    imageUrl: imageUrl,
                    title: title
                }

            }
        }
    }
}