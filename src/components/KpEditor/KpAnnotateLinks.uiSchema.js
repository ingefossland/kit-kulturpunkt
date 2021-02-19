import itemsUi from "./KpLink.uiSchema"

export default {
    "ui:field": "kpAnnotateLinks",
    "ui:options": {
        "sortable": true
    },
    "items": {
        ...itemsUi,
        "ui:preview": {
            "select": {
                "badgeContent": "badgeContent",
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
                const badgeContent = index + 1

                const localTitle = runningHead && title && runningHead + ": " + title || title
                const referenceTitle = referenceId && reference && reference.title
    
                const imageUrl = media && media.imageUrl ||reference && reference.imageUrl
                const typeLabel = referenceId && reference && reference.documentType
    
                let metadata = []
    
                referenceId && reference && reference.title && metadata.push(reference.title)
    
                return {
                    badgeContent: badgeContent,
                    imageUrl: imageUrl,
                    typeLabel: typeLabel,
                    title: localTitle || referenceTitle,
                    metadata: metadata,
                }
    
            }
        },
    }
}