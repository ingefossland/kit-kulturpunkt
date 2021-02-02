export default {
  "select": {
    "title" : "title",
    "description" : "description",
    "label": "label",
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
  
    let label, metadata = []
    
    if (mediaType) {
      label = mediaType;
    }

    if (mimeType) {
      label = mimeType;
    }
  
    return {
      title: title,
      description: description,
      label: label,
      metadata: metadata
    }
    
  }
}