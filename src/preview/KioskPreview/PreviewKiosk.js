import React from "react"
import Article from "./Article"
import Page from "./Page"

const templates = {
    "device": Page,
    "page": Page,
    "article": Article
}

const PreviewKiosk = (props) => {
    const documentType = props && props.formData && props.formData.documentType;

    let template;

    if (documentType && documentType.startsWith('page')) {
        template = "page"
    } else {
        template = documentType
    }

    let PreviewTemplate = templates && templates[template]

    if (!PreviewTemplate) {
        return (<p>No preview for {documentType}</p>)
    }

    return (
        <PreviewTemplate {...props} />
    )

}

export default PreviewKiosk