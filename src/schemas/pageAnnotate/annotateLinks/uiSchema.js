import links from "../../page/links/uiSchema"

export default {
    ...links,
    "ui:field": "kpAnnotateArray",
    "ui:title": "Markører",
    "ui:layout": "list",
    "ui:preview": {
        "select": {
            "title": "title"
        },
        prepare({formData = []}) {
            return {
                title: formData.length + " markører"
            }
        }
    },
    "items": {
        ...links.items,
        "ui:preview": {
            "select": {
                "sortBadge": "sortBadge",
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
                const sortBadge = index + 1

                const localTitle = runningHead && title && runningHead + ": " + title || title
                const referenceTitle = referenceId && reference && reference.title
    
                const imageUrl = media && media.imageUrl ||reference && reference.imageUrl
                const typeLabel = referenceId && reference && reference.documentType
    
                let metadata = []
    
                referenceId && reference && reference.title && metadata.push(reference.title)
    
                return {
                    sortBadge: sortBadge,
                    imageUrl: imageUrl,
                    typeLabel: typeLabel,
                    title: localTitle || referenceTitle,
                    metadata: metadata,
                }
    
            }
        },
    }
}