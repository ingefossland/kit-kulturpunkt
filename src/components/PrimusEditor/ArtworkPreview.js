import React from "react"
import PreviewTemplate from "../PrimusPreview/PreviewTemplate"
import PreviewScroller from "../PrimusPreview/PreviewScroller"

const ArtworkPreview = ({formData}) => {

    return (
        <PreviewScroller>
            <PreviewTemplate {...formData} />
        </PreviewScroller>
    )

}

export default ArtworkPreview;