export default {
    "ui:layout": "section",
    "ui:icon": "menu",
    "ui:title": "Innhold",
    "ui:options" : {
        "draggable": true
    },
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData}) {
            const count = formData && formData.length;
            if (count) {
                return {
                    "title": count + " sider"
                }
            }
            return {
               "title": "Ingen sider"
            }
        }
    },
    "ui:dialog": {
        "query": {
            "models": "documents",
            "documentType": "page*"
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn side"
        },
    ],
    "items": {
        "ui:options": {
            "editable": false
        },
        "ui:field": "kpDeviceLink"
    }
}