import links from "../../page/links/uiSchema"

export default {
    ...links,
    "items": {
        ...links.items,
        "ui:settings": [
            "grid",
            "placement",
            "backgroundColor",
            "color"
        ],
    

        "content": {
            ...links.items.content,
            "linkContent": {
                ...links.items.content.linkContent,
                "title": {
                    ...links.items.content.linkContent.title,
                    "ui:settings": [
                        "titleSize",
                        "titleColor",
                    ],
                }
            }
        }
    }
}