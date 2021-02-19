import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import ArticleBase from "./ArticleBase"
import ArticleHeader from "./ArticleHeader"
import ArticleTypography from "./ArticleTypography"
import ArticleSection from "./ArticleSection"

import Metadata from "./Metadata"

const KnavPreview = ({
    expanded = false,
    title,
    uuid,
    ...props
}) => {

    let metadata = []

    if (uuid) {
        metadata.push({
            label: "UUID",
            value: uuid
        })
    }

    return (
        <ArticleBase>
            <ArticleHeader title={title} />

            <ArticleSection>
                <Metadata items={metadata} />
            </ArticleSection>

            {JSON.stringify(props)}

        </ArticleBase>
    )


}

KnavPreview.propTypes = {
}

export default KnavPreview;