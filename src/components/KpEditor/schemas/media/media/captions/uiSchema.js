export default {
    "ui:field": "mediaChildren",
    "ui:layout": "section",
    "ui:title": "Undertekster",
    "ui:icon": "library_books",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            const title = formData.length + " undertekster"
            return {
                title: title
            }
        }
    },
    "items": {
        "ui:layout": "module"
    }
}