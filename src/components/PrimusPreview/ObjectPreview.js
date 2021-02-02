import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

import ArticleBase from "./ArticleBase"
import ArticleHeader from "./ArticleHeader"
import ArticleMedia from "./ArticleMedia"
import ArticleTypography from "./ArticleTypography"
import ArticleSection from "./ArticleSection"

import Metadata from "./Metadata"

import SectionMetadata from "./SectionMetadata"
import SectionHistory from "./SectionHistory"
import SectionExhibitions from "./SectionExhibitions"
import SectionLicense from "./SectionLicense"
import SectionClassification from "./SectionClassification"

const useStyles = makeStyles(theme => ({
    article: {
        backgroundColor: "white",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minWidth: 360,

        padding: 36,

        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,

    },
    body: {
//        minHeigth: 640
    },
}));

const ArtifactPreview = ({
    title,
    description,
    imageUrl,
    producer,
    dating,
    ...props
}) => {

    const _onSelect = (event, item) => {
        event.stopPropagation()
        props.onSelect && props.onSelect(item)
    }

    const classes = useStyles()

    const media = imageUrl && [{
        imageUrl: imageUrl
    }]

    // metadata

    let metadata = []

    if (producer) {

        producer && producer.name && metadata.push({
            name: "producer",
            label: producer && producer.role && producer.role.name || "Produsent",
            value: producer && producer.name,
            onClick: (e) => _onSelect(e, {
                documentType: "producer",
                ...producer
            })
        })
    
    }

    if (dating) {
        metadata.push({
            name: "dating",
            label: "Datering",
            value: dating.value
        })
    }

    return (
        <ArticleBase>
            <ArticleHeader title={title || "Uten tittel"} />
            {media && <ArticleMedia items={media} /> }


            <ArticleSection>
                <Metadata items={metadata} />
            </ArticleSection>


            <ArticleTypography>{description}</ArticleTypography>

            <SectionMetadata {...props} />
            <SectionHistory {...props} />
            <SectionExhibitions {...props} />

            <SectionLicense {...props} />
            <SectionClassification {...props} />
            <div className={classes.body}>

            </div>
        </ArticleBase>
    )


}

export default ArtifactPreview;