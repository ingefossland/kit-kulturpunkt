export default {
    "select": {
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
        "typeLabel": "typeLabel"
    },
    prepare({formData, formContext}) {
        let { documentType, locale, imageUrl, title, content, description } = formData
  
        const { defaultLocale } = formContext
        const localeId = "locale:" + defaultLocale;
  
        let metadata = []

        const backgroundImage = content && content.backgroundImage;
        const hasPages = content && content.hasPages;
        const deviceTitle = content && content.deviceTitle
        const deviceId = content && content.deviceId
        const deviceType = content && content.deviceType

        const typeLabel = deviceType && documentType + "/" + deviceType || documentType

        if (backgroundImage && backgroundImage.media && backgroundImage.media.imageUrl) {
            imageUrl = backgroundImage.media.imageUrl
        }
      
        if (hasPages && hasPages.length) {
            metadata.push(hasPages.length + ' sider')
        }

        if (deviceId) {
            metadata.push('#'+deviceId)
        }

        return {
            imageUrl: imageUrl,
            title: deviceTitle || title,
            description: description,
            metadata: metadata,
            typeLabel: typeLabel
        }
      
    }
    
}