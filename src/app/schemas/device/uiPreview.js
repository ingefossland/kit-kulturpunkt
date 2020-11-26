import icons from "../../icons"

export default {
    "select": {
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
        "metadata" : "metadata",
        "typeLabel": "typeLabel",
        "icon": "icon",
    },
    prepare({formData, formContext}) {
        let { documentType, imageUrl, title, content, description } = formData
  
        const defaultLocale = formContext && formContext.defaultLocale
        const currentLocale = formContext && formContext.currentLocale
        const locale = defaultLocale || currentLocale || formData.locale
        const localeId = "locale:" + locale;
  
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

        if (deviceType) {
            metadata.push(deviceType)
        }

        let icon

        const deviceIcons = {
            ...icons,
            "windows": icons["deviceWin"],
            "ipad": icons["deviceMac"],
        }

        if (deviceType && deviceIcons[deviceType]) {
            icon = deviceIcons[deviceType]
        } else {
            icon = deviceIcons["device"]
        }



        return {
            icon: icon,
            imageUrl: imageUrl,
            title: deviceTitle || title,
            description: description,
            metadata: metadata,
            typeLabel: typeLabel
        }
      
    }
    
}