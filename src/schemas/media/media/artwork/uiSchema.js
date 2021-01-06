export default {
    "ui:layout": "section",
    "ui:field": "mediaChildren",
    "ui:title": "Artwork",
    "ui:icon": "photo_library",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            const title = formData.length + " bilder"
            return {
                title: title
            }
        }
    },
    "items": {
        "ui:layout": "module"
    }
}