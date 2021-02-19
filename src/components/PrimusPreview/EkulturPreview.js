import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

import {
    ArticleBase,
    ArticleHeader,
    ArticleTypography,
    ArticleSection,
    MediaSlideshow,
    Metadata,
    Events
} from "../PrimusPreview"

const ArtworkPreview = ({
    title,
    identifier,
    description,
    imageUrl,
    content = {},
    ...props
}) => {

    const { t, i18n } = useTranslation(['preview'])

    const {
        license = [],
        owner,
        ownerName,
        producer,
    } = content

    let images

    if (imageUrl) {
        images = [{mediaId: 1, media: { imageUrl: imageUrl }}]
    }
    

    const _onSelect = (event, item) => {
        event.stopPropagation()
        props.onSelect && props.onSelect(item)
    }

    // metadata

    let metadata = []

    if (producer) {

        metadata.push({
            label: t("Producer"),
            value: producer,
            onClick: (e) => _onSelect(e, {
                documentType: "person",
                name: producer
            })
        })
    
    }

    if (identifier) {
        metadata.push({
            label: t("Identifier"),
            value: identifier
        })
    }

    return (
        <ArticleBase>
            <ArticleHeader title={title || "Uten tittel"} />
            { images && <MediaSlideshow items={images} /> }

            <ArticleSection>
                <Metadata items={metadata} />
            </ArticleSection>

            <ArticleTypography>{description}</ArticleTypography>


        </ArticleBase>
    )


}

export default ArtworkPreview;