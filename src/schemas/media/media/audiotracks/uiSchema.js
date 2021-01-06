export default {
    "ui:field": "mediaChildren",
    "ui:layout": "section",
    "ui:title": "Lydspor",
    "ui:icon": "library_music",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            const title = formData.length + " lydspor"
            return {
                title: title
            }
        }
    },
    "items": {
        "ui:layout": "module"
    }
}