export default {
  "select": {
    "title" : "title",
    "description" : "description",
    "typeLabel": "typeLabel",
    "metadata": "metadata"
  },
  prepare({formData}) {
    let { title, description, mediaType, mimeType, content } = formData;
    
    if (content && content.title) {
      title = content.title
    }

    if (content && content.description) {
      description = content.description
    }

    const typeLabel = mimeType || mediaType
  
    return {
        title: title,
        description: description,
        typeLabel: typeLabel,
        metadata: metadata
    }
    
    }
}