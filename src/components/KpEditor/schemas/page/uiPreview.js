import icons from "../../../KpIcons"

export default {
    "select": {
        "imageUrl" : "imageUrl",
        "imageWidth" : "imageWidth",
        "imageHeight" : "imageHeight",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
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

        const image = content && content.backgroundImage && content.backgroundImage.media
        const imageUrl = image && image.imageUrl
        const imageWidth = image && image.mediaWidth
        const imageHeight = image && image.mediaHeight

        const icon = documentType && icons[documentType]
        const title = content && content.title && content.title[localeId] || formData.title
        const description = content && content.description && content.description[localeId]

        return {
            icon: icon,
            imageUrl: imageUrl,
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            title: title || "Untitled",
            description: description,
            metadata: metadata,
        }
    
    }
  
}