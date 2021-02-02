import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import ArticleBase from "./ArticleBase"
import ArticleHeader from "./ArticleHeader"
import ArticleTypography from "./ArticleTypography"
import ArticleSection from "./ArticleSection"

import Metadata from "./Metadata"

import SectionMetadata from "./SectionMetadata"
import SectionHistory from "./SectionHistory"
import SectionExhibitions from "./SectionExhibitions"
import SectionLicense from "./SectionLicense"
import SectionClassification from "./SectionClassification"

import Icon from "./icons/Person"


const PersonPreview = ({
    expanded = false,
    name,
    gender,
    biography,
    birthDate,
    birthPlace,
    deathDate,
    deathPlace
}) => {

    const names = name.split(',')
    const title = names.reverse().join(" ")

    let metadata = []

    if (name) {
        metadata.push({
            label: "Navn",
            value: name
        })
    }

    if (birthDate) {

        birthDate = moment(birthDate).format("D. MMMM YYYY")

        let values = []

        values.push(birthDate)
        
        if (birthPlace) {
            values.push(birthPlace)
        }
        
        metadata.push({
            label: "Født",
            values: values
        })
    }

    if (deathDate) {

        deathDate = moment(deathDate).format("D. MMMM YYYY")

        let values = []

        values.push(deathDate)
        
        if (deathPlace) {
            values.push(deathPlace)
        }
        
        metadata.push({
            label: "Død",
            values: values
        })
    }    

    return (
        <ArticleBase>
            <ArticleHeader title={title || name} />

            <ArticleSection>
                <Metadata items={metadata} />
            </ArticleSection>

            <ArticleTypography>{biography}</ArticleTypography>

        </ArticleBase>
    )


}

PersonPreview.propTypes = {
    gender: PropTypes.oneOf(["male","female"])
}

export default PersonPreview;