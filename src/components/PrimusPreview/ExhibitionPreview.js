import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import ArticleBase from "./ArticleBase"
import ArticleHeader from "./ArticleHeader"
import ArticleTypography from "./ArticleTypography"
import ArticleSection from "./ArticleSection"

import Metadata from "./Metadata"


const ExhibitionPreview = ({
    title,
    dtStart,
    dtEnd
}) => {

    let metadata = []

    if (dtStart) {
        metadata.push({
            label: "Utstilling åpnet",
            value: moment(dtStart).format("D. MMMM YYYY")
        })
    }

    if (dtEnd) {
        metadata.push({
            label: "Utstilling avsluttet",
            value: moment(dtEnd).format("D. MMMM YYYY")
        })
    }


    return (
        <ArticleBase>
            <ArticleHeader title={title || name} />

            <ArticleSection>
                <Metadata items={metadata} />
            </ArticleSection>

        </ArticleBase>
    )


}

PersonPreview.propTypes = {
    gender: PropTypes.oneOf(["male","female"])
}

export default ExhibitionPreview;