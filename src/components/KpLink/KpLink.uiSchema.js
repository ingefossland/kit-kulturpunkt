export default {
    "ui:field": "kpLink",
    "ui:layout": "module",
    "ui:options": {
        "minHeight": 256,
        "editable": true
    },
    "ui:nav": true,
    "ui:fieldset": [
        "link",
    ],
    "ui:preview": {
        "select": {
            "imageUrl": "imageUrl",
            "typeLabel": "typeLabel",
            "title": "title",
            "metadata": "metadata",
        },
        prepare({formData, formContext, index}) {
            const { mediaId, media, referenceId, reference } = formData

            const locale = formContext.currentLocale || formContext.defaultLocale;
            const localeId = "locale:" + locale

            const title = formData.title && formData.title[localeId] 

            const imageUrl = media && media.imageUrl ||reference && reference.imageUrl

            const typeLabel = referenceId && reference && reference.documentType

            let metadata = []

            referenceId && reference && reference.title && metadata.push(reference.title)

            return {
                imageUrl: imageUrl,
                typeLabel: typeLabel,
                title: title || referenceId && reference && reference.title,
                metadata: metadata,
            }

        }
    },
    "imageFilters": {
        "ui:title": "Filters",
        "ui:field": "imageFilters"
    },
    "imageCropdata": {
        "ui:title": "Crop",
        "ui:field": "imageCropdata"
    },
    "imageFocalpoint": {
        "ui:title": "Fokuspunkt",
        "ui:field": "imageFocalpoint"
    },
    "link": {
        "ui:title": "Innhold",
        "ui:layout": "kioskLink",
        "ui:fieldset": [
            "linkMedia",
            "linkContent",
            "linkReference",
        ],
        "ui:options": {
            "padding": 2,
            "spacing": 2
        },
        "linkMedia": {
            "ui:fieldset": [
                "mediaId",
                "media"
            ],
            "ui:sidebar": {
                "query": {
                    "models": "media",
                    "mediaType": "image"
                }
            },
            "ui:layout": "kioskLinkMedia",
            "ui:buttons": [
                "sidebar"
            ],
        },
        "linkReference": {
            "ui:fieldset": [
                "referenceId",
                "reference"
            ],
            "ui:sidebar": {
                "query": {
                    "models": "documents",
                    "documentType": ["page*","article"]
                }
            },
            "ui:layout": "kioskLinkReference",
            "ui:options": {
                "editable": true,
                "deletable": true,
                "restorable": true
            }
        },
        "linkContent": {
            "ui:layout": "kioskLinkContent",
            "ui:grid": true,
            "ui:padding": 2,
            "ui:spacing": 2,
            "ui:fieldset": [
                "runningHead",
                "title",
                "description",
            ],
            "runningHead": {
                "ui:title": "Stikktittel"
            },
            "title": {
                "ui:title": "Tittel"
            },
            "description": {
                "ui:title": "Beskrivelse",
            },
        },
    },
    "imageAnnotations": {
        "ui:title": "Markør",
        "ui:fieldset": [
            "coords"
        ],
        "coords": {
            "ui:fieldset": [
                "x", "y", "top", "left"
            ],
            "ui:grid": true,
            "ui:padding": 2,
            "ui:spacing": 2,
            "x": {
                "ui:gridCols": 6
            },
            "y": {
                "ui:gridCols": 6
            },
            "top": {
                "ui:gridCols": 6
            },
            "left": {
                "ui:gridCols": 6
            }
        }
    }
}