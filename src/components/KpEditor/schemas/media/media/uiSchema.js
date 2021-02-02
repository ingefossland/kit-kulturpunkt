import uiPreview from './uiPreview';

import data from "./data/uiSchema"
import file from "./file/uiSchema"
import metadata from "./metadata/uiSchema"
import rights from "./rights/uiSchema"
import settings from "./settings/uiSchema"

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:options": {
        "collapsible": true
    },  
    "ui:fieldset": [
        "content",
        "settings",
    ],
    "settings": settings,    
    "content": {
        "ui:layout": "pageContent",
        "ui:nav": true,
        "ui:fieldset": [
            "data",
            "file",
            "metadata",
            "rights"
        ],
        "data": {
            ...data,
            "ui:layout": "section",
            "ui:icon": "image",
            "ui:title": "Bilde"
        },
        "file": {
            ...file,
            "ui:layout": "section",
            "ui:icon": "tag",
            "ui:title": "File",
        },
        "metadata": {
            ...metadata,
            "ui:layout": "section",
            "ui:icon": "tag",
            "ui:title": "Metadata",
        },
        "rights": {
            ...rights,
            "ui:layout": "section",
            "ui:icon": "copyright",
            "ui:title": "Rettigheter",
        }
    }
}