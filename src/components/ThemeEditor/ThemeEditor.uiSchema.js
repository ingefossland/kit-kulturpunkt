import colorUi from "./ThemePaletteColor.uiSchema"

export default {
    "ui:fieldset": [
        "type",
        "palette",
        "colors"
    ],
    "ui:options": {
        "spacing": 2
    },
    "palette": {
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "primary": {
            ...colorUi,
            "ui:field": "themePaletteColor",
            "ui:layout": "fieldset",
            "ui:title": "Primary",
            "ui:options": {
                "xs": 6,
                "grid": true
            },
        },
        "secondary": {
            ...colorUi,
            "ui:field": "themePaletteColor",
            "ui:layout": "fieldset",
            "ui:title": "Secondary",
            "ui:options": {
                "xs": 6,
                "grid": true
            }
        },
    },
    "colors": {
        "ui:title": "Additional colors",
        "ui:layout": "fieldset",
        "ui:sortable": true,
        "items": {
            "ui:widget": "themePaletteColor",
            "ui:title": "Color"
        }
    }
}