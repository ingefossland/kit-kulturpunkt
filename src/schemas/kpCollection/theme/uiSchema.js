import registry from "../../../components/registry"
const themeEditor = registry.models.themeEditor

export default {
    ...themeEditor.uiSchema,
    "ui:title": "Theme",
    "ui:icon": "palette",
    "ui:layout": "section",
    "ui:options": {
        "spacing": 2
    },
}