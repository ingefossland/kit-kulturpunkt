import React from "react"
import PreviewTemplate from "../../../PrimusPreview/PreviewTemplate"
import PreviewScroller from "../../../PrimusPreview/PreviewScroller"

import schema from "./schema"
import uiSchema from "./uiSchema"
import formData from "./formData"

const ArtworkPreview = ({formData}) => {

    return (
        <PreviewScroller>
            <PreviewTemplate {...formData} />
        </PreviewScroller>
    )

}

export default {
    name: "artifact",
    schemaType: "documents",
    schemaId: 1,
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: ArtworkPreview
    }
}