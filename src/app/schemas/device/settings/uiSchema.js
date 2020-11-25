export default {
    "ui:field": "pageSettings",
    "ui:nav": true,
    "ui:fieldset": [
        "device",
    ],
    "device": {
        "ui:layout": "section",
        "ui:fieldset": [
            "content"
        ],
        "content": {
            "ui:fieldset": [
                "deviceTitle",
                "deviceId"
            ],
            "deviceTitle": {
                "ui:title": "Intern tittel"
            },
            "deviceId": {
                "ui:title": "DeviceId"
            }
        }
    }
}