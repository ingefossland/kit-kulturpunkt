import icons from "../../app/icons"

export default {
  "select": {
        "icon": "icon",
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
        "typeLabel": "typeLabel"
  },
  prepare({formData, formContext}) {
    let { documentType, title, content, description } = formData

    const defaultLocale = formContext && formContext.defaultLocale
    const currentLocale = formContext && formContext.currentLocale
    const locale = defaultLocale || currentLocale || formData.locale
    const localeId =  "locale:" + locale

    let metadata = []

    const titleImage = content && content.titleImage
    const imageUrl = titleImage && titleImage.media && titleImage.media.imageUrl
    
    if (content) {

        title = content.title && content.title[localeId]
        description = content.description && content.description[localeId]

        const { location, sections, isPartOf } = content

        if (location && location.lat && location.lng) {
            
            if (location.address) {
                metadata.push(location.address)
            } else {
                metadata.push("Sted")
            }
            
        }

        if (sections && sections.length) {
            metadata.push(sections.length + ' seksjoner')
        }

        if (isPartOf && isPartOf.length) {
            metadata.push(isPartOf.length + ' tema')
        }
        
                
    }

    return {
        icon: icons["article"],
        imageUrl: imageUrl,
        untitled: "Ny artikkel",
        title: title || "Uten tittel",
        description: description,
        metadata: metadata,
        typeLabel: documentType
    }
    
  }
  
}