import pageIcons from "./pageIcons"

export default {
    "select": {
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
        "typeLabel": "typeLabel"
    },
    prepare({formData, formContext}) {
        let { imageUrl, title, content, description } = formData
        const defaultLocale = formContext && formContext.defaultLocale
        const currentLocale = formContext && formContext.currentLocale

        const localeId = defaultLocale && "locale:" + defaultLocale || "locale:no"

        let metadata = []

        const pageType = content && content.pageType
        const pageIcon = pageType && pageIcons[pageType]

        let typeLabel = "page"
    
        if (content) {

            const { pageType, pageTitle, pageMedia } = content

            typeLabel = "page/" + pageType
            title = pageTitle && pageTitle[localeId]
            imageUrl = pageMedia && pageMedia.media && pageMedia.media.imageUrl
        
            if (content.description && content.description[localeId]) {
                description = content.description[localeId]
            }


            const location = content.location;

            if (location && location.lat && location.lng) {
                
                if (location.address) {
                    metadata.push(location.address)
                } else {
                    metadata.push("Sted")
                }
                
            }

            const hasLinks = content.hasLinks;

            if (hasLinks && hasLinks.length) {
                metadata.push(hasLinks.length + ' lenker')
            }
                
        }

        return {
            imageUrl: imageUrl || pageIcon,
            title: title || "Untitled",
            description: description,
            metadata: metadata,
            typeLabel: typeLabel
        }
    
    }
  
}