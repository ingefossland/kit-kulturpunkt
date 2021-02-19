export default {
    "ui:title": "Mål",
    "ui:help": "Bredde x Dybde x Høyde",
    "ui:options": {
        "grid": true,
        "spacing": 2,
        "collapsible": true
    },
    "ui:fieldset": [
        "measureType",
        "width",
        "height",
        "depth",
        "unit",
        "description",
    ],
    "value": {
        "ui:title": "Mål"
    },
    "measureType": {
        "ui:title": "Type mål",
        "ui:variant": "standard",
//        "ui:widget": "selectNative",
        "ui:xs": 12
    },
    "description": {
        "ui:title": "Beskrivelse",
        "ui:widget": "textarea",
        "ui:variant": "standard",
        "ui:xs": 12
    },
    "width": {
        "ui:variant": "standard",
        "ui:title": "Bredde",
        "ui:xs": 3
    },
    "height": {
        "ui:variant": "standard",
        "ui:title": "Høyde",
        "ui:xs": 3
    },
    "depth": {
        "ui:variant": "standard",
        "ui:title": "Dybde",
        "ui:xs": 3
    },
    "unit": {
        "ui:variant": "standard",
        "ui:title": "Enhet",
//        "ui:widget": "selectNative",
        "ui:xs": 3
    }

}