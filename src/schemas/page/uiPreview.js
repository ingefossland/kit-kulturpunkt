import icons from "../../app/icons"

export default {
    "select": {
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
        "typeLabel": "typeLabel",
        "icon": "icon"
    },
    prepare({formData, formContext}) {
        const { parentId, documentType, content } = formData
        const defaultLocale = formContext && formContext.defaultLocale
        const currentLocale = formContext && formContext.currentLocale
        const locale = defaultLocale || currentLocale || formData.locale
        const localeId =  "locale:" + locale

        let metadata = []

        parentId && metadata.push("Parent: " + parentId)

        const backgroundImage = content && content.backgroundImage

        const imageUrl = backgroundImage && backgroundImage.media && backgroundImage.media.imageUrl

        const icon = documentType && icons[documentType]
        const title = content && content.title && content.title[localeId] || formData.title
        const description = content && content.description && content.description[localeId]

        return {
            icon: icon,
            imageUrl: imageUrl,
            title: title || "Untitled",
            description: description,
            metadata: metadata,
            typeLabel: documentType,
        }
    
    }
  
}