import registry from "../../../registry"
const { models } = registry

const itemsUi = models.kpLink.uiSchema

export default {
    ...itemsUi,
    "ui:settings": [
        "grid",
        "placement",
        "backgroundColor",
        "color"
    ],


    "content": {
        ...itemsUi.content,
        "linkContent": {
            ...itemsUi.content.linkContent,
            "title": {
                ...itemsUi.content.linkContent.title,
                "ui:settings": [
                    "titleSize",
                    "titleColor",
                ],
            }
        }
    }
}