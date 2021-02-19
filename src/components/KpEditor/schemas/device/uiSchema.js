import uiPreview from "./uiPreview";

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content",
    ],
    "content": {
        "ui:field": "kpDevice",
//        "ui:nav": true,
        "ui:fieldset": [
            "header",
            "media",
            "hasPages",
        ],
        "header": {
            "ui:layout": "section",
            "ui:options" : {
                "expanded": true,
                "collapsible": true,
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
        },
        "media": {
            "ui:layout": "section",
            "ui:title": "Bakgrunnsbilde",
            "ui:options": {
                "collapsible": true
            },
            "ui:fieldset": [
                "backgroundImage",
            ],
            "backgroundImage": {
                "ui:buttons": [
                    {
                        "icon": "search",
                        "title": "Finn bakgrunnsbilde",
                        "type": "sidebar"
                    }
                ]
            }
        },
        "hasPages": {
            "ui:layout": "section",
            "ui:title": "Innhold",
            "ui:options" : {
                "collapsible": true,
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
    }
}