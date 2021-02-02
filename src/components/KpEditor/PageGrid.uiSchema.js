import uiSchema from "./KpPage.uiSchema"

const links = uiSchema.content.body.links

const gridLinks = {
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


export default {
    ...uiSchema,
    "content": {
        ...uiSchema.content,
        "ui:fieldset": [
            "header",
            "media",
            "body"
        ],
        "body": {
            "ui:layout": "section",
            "ui:title": "Lenker",
            "ui:icon": "link",
            "ui:fieldset": [
                "links"
            ],
            "ui:settings": [
            ],
            "links": gridLinks
        }
    }
}