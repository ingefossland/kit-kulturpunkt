import icons from "../../../KpIcons"

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
        const { parents, children, parentId, documentType, content } = formData
        const defaultLocale = formContext && formContext.defaultLocale
        const currentLocale = formContext && formContext.currentLocale
        const locale = defaultLocale || currentLocale || formData.locale
        const localeId =  "locale:" + locale

        let metadata = []

        let path = []

        parents && parents.map(parent => {
            path.push(parent.title)
        })

        path.length && metadata.push("/" + path.join('/'))

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