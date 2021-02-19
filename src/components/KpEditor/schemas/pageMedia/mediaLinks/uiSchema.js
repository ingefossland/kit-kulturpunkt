import links from "../../pageX/links/uiSchema"

export default {
    ...links,
    "ui:title": "Media",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            return {
                title: formData.length + " media"
            }
        }
    },
    "ui:dialog": {
        "query": {
            "models": "media",
            "mediaType": ["image","video","audio"]
        }
    },
    "ui:buttons": [
        {
            "type": "sidebar",
            "icon": "search",
            "title": "Finn media",
        },
        {
            "type": "upload",
            "title": "Last opp"
        }
    ],
    "items": {
        ...links.items,
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
            ...links.items.link,
            "linkMedia": {
                ...links.items.content.linkMedia,
                "ui:sidebar": {
                    "query": {
                        "models": "media",
                        "mediaType": ["image","video","audio"]
                    }
                }
            }
        }
    }
}