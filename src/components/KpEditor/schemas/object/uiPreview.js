import icons from "../../../KpIcons"

export default {
  "select": {
        "icon": "icon",
        "imageUrl" : "imageUrl",
        "title" : "title",
        "description" : "description",
  },
  prepare({formData, formContext}) {
    let { imageUrl, documentType, title, content, description } = formData

    const defaultLocale = formContext && formContext.defaultLocale
    const currentLocale = formContext && formContext.currentLocale
    const locale = defaultLocale || currentLocale || formData.locale
    const localeId =  "locale:" + locale

    if (content) {


        
                
    }

    return {
        icon: icons["object"],
        imageUrl: imageUrl,
        untitled: "Object",
        title: title || "Uten tittel",
        description: description,
    }
    
  }
  
}