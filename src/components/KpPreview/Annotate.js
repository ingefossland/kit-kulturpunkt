import React from "react"
import PreviewFormat from "./PreviewFormat"
import Imagemap from "./AnnotateImagemap"
import Legends from "./AnnotateLegends"

const templates = {
    "imagemap": Imagemap,
    "legends": Legends,
}

const AnnotatePreview = ({formData, formContext}) => {

    const { content } = formData;

    const layout = content && content.annotateLayout
    const template = layout && templates[layout] || templates["imagemap"]
    const Template = template

    return (
        <PreviewFormat format="16:9">
            <Template formData={formData} formContext={formContext} />
        </PreviewFormat>
    )

}

AnnotatePreview.defaultProps = {
    formData: {},
    formContext: {}
}

export default AnnotatePreview