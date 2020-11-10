export default {
    "ui:layout": "section",
    "ui:icon": "settings",
    "ui:options" : {
        "expanded": true,
//        "collapsible": true,
        "spacing": 2
    },
    "ui:title": "Enhet",
    "ui:preview": {
        "select": {
            "description": "description"
        },
        prepare({formData, formContext}) {
            const localeId = "locale:" + formContext.currentLocale
            const description = formData.deviceTitle 

            return {
                description: description
            }

        }
    },
    "ui:fieldset": [
        "deviceTitle",
        "deviceId",
        "deviceType",
        "serialNumber",
        "startPageId"
    ],
    "deviceTitle": {
        "ui:title": "Intern tittel"
    },
    "deviceId": {
        "ui:title": "Id",
    },
    "deviceType": {
        "ui:title": "Type enhet",
    },
    "serialNumber": {
        "ui:title": "Serienummer"
    },
    "leadtext": {
        "ui:title": "Ingress",
        "ui:widget": "textarea"
    },
    "bodytext": {
        "ui:title": "Brødtekst",
        "ui:widget": "textarea"
    }
}