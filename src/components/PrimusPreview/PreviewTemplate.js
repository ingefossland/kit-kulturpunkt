import React, { useEffect, useState } from "react"
import ObjectPreview from "./ObjectPreview"
import PersonPreview from "./PersonPreview"
//import ExhibitionPreview from "./ExhibitionPreview"

const templates = {
    "object": ObjectPreview,
    "person": PersonPreview,
 //   "exhibition" ExhibitionPreview
}

const PreviewTemplate = ({documentType, ...props}) => {

    let template = templates["object"]

    if (templates[documentType]) {
        template = templates[documentType]
    }

    const Template = template

    return (
        <Template {...props} />
    )

}

export default PreviewTemplate;