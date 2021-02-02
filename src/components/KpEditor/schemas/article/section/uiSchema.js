import media from "./mediaUi"
import attachments from "./attachmentsUi"
import links from "./linksUi"
import ekultur from "./ekulturUi"
import uiPreview from "./uiPreview"

export default {
    "ui:layout": "section",
    "ui:preview": uiPreview,
    "ui:options": {
        "editable": true,
        "hideable": true,
        "removable": true,
        "spacing": 2
    },
    "ui:settings": [
        "sectionType",
        "sectionLayout"
    ],
    "sectionType": {
        "ui:enumIcons": {
            "text": "subject",
            "media": "insert_photo",
            "links": "insert_link",
            "attachments": "attach_file",
            "quote": "format_quote",
            "dm": "fingerprint"
        }
    },
    "ui:fieldset": [
        "head",
        "body"
    ],
    "head": {
        "ui:fieldset": [
            "title",
            "titleHidden",
            "description"
        ],
        "ui:options": {
            "grid": true,
            "spacing": 2
        },
        "title": {
            "ui:xs": 9,
            "ui:label": false,
            "ui:placeholder": "Tittel"
        },
        "titleHidden": {
            "ui:gridCols": 3,
            "ui:title": "Skjul tittel",
            "ui:widget": "switch"
        },
        "description" : {
            "ui:gridCols": 12,
            "ui:title": "Beskrivelse",
            "ui:widget" : "textarea",
        }
    },
    "body": {
        "ui:fieldset": [
            "media",
            "attachments",
            "references",
            "bodytext",
            "links",
            "quote",
            "cite"
        ],
        "ui:options": {
            "spacing": 2
        },
        "media": media,
        "attachments": attachments,
        "references": ekultur,
        "bodytext" : {
            "ui:title": "Brødtekst",
            "ui:widget" : "texteditor"
        },
        "quote" : {
            "ui:title": "Sitat",
            "ui:widget" : "textarea"
        },
        "cite" : {
            "ui:title": "Byline",
        },
        "links" : links
    }
}