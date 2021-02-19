import React, { useEffect, useState } from "react"
import DocumentPreview from "./DocumentPreview"
import EkulturPreview from "./EkulturPreview"
import KnavPreview from "./KnavPreview"
import PersonPreview from "./PersonPreview"

const templates = {
    "document": DocumentPreview,
    "ekultur": EkulturPreview,
    "knav": KnavPreview,
    "person": PersonPreview,
}

const PreviewTemplate = ({source, documentType, ...props}) => {

    let template = templates["document"]

    if (templates[documentType]) {
        template = templates[documentType]
    } else if (source && templates[source]) {
        template = templates[source]
    }

    const Template = template

    return (
        <Template {...props} />
    )

}

export default PreviewTemplate;