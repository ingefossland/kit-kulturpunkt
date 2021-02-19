import itemsUi from "../page/itemsUi"

export default {
    ...itemsUi,
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

            const runningHead = formData.runningHead && formData.runningHead[localeId] 
            const title = formData.title && formData.title[localeId] 

            const localTitle = runningHead && title && runningHead + ": " + title || title
            const referenceTitle = referenceId && reference && reference.title

            const imageUrl = media && media.imageUrl ||reference && reference.imageUrl
            const typeLabel = referenceId && reference && reference.documentType

            let metadata = []

            referenceId && reference && reference.title && metadata.push(reference.title)

            return {
                imageUrl: imageUrl,
                typeLabel: typeLabel,
                title: localTitle || referenceTitle,
                metadata: metadata,
            }

        }
    },
    "link": {
        ...itemsUi,
        "linkMedia": {
            ...itemsUi.content.linkMedia,
            "ui:sidebar": {
                "query": {
                    "models": "media",
                    "mediaType": ["image","video","audio"]
                }
            }
        }
    }
}