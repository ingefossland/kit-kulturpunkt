import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

import PreviewTheme from "./PreviewTheme"

import {
    ArticleBase,
    ArticleHeader,
    ArticleTypography,
    ArticleSection,
    MediaSlideshow,
    Metadata,
    Classifications,
    Measures,
    Motif,
    Events,
    Colors
} from "."

const ArtworkPreview = ({
    content = {},
    ...props
}) => {

    const { t, i18n } = useTranslation(['preview'])

    const {
        identifier,
        title,
        description,
        artist,
        dating,
        designations = [],
        materials = [],
        techniques = [],
        images,
        measures = [],
        classifications = [],
        events = [],
        motifType,
        motifDescription,
        depictedPeople = [],
        depictedPlaces = [],
        colors = []
    } = content


    const _onSelect = (event, item) => {
        event.stopPropagation()
        props.onSelect && props.onSelect(item)
    }

    // metadata

    let metadata = []

    if (designations && designations.length) {

        metadata.push({
            label: t("Designation"),
            inline: true,
            values: designations,
        })
        
    }

    if (materials && materials.length) {

        metadata.push({
            label: t("Material"),
            inline: true,
            values: materials,
        })
        
    }

    if (techniques && techniques.length) {

        metadata.push({
            label: t("Technique"),
            inline: true,
            values: techniques,
        })
        
    }

    if (artist && artist.value) {

        metadata.push({
            ...artist,
            label: t("Artist"),
        })
    
    }

    if (dating) {
        metadata.push({
            label: t("Dating"),
            value: dating.value
        })
    }

    if (identifier) {
        metadata.push({
            label: t("Identifier"),
            value: identifier
        })
    }


    // references

    const references = [
        {
            author: "Jenst Thiis",
            title: "Beskrivende fortegnelse over museets moderne erhvervelser ved udenlandske kjøb i året 1901",
            value: "I Årbog 1898-1901, 147-176 (Trondhjem: Nordenfjeldske Kunstindustrimuseum, 1902), 175-176 (nr. 133)",
        },
        {
            value: "Kunsthåndverk og formgiving (Outline)",
            code: "OU 531"
        }
    ]

    // motif

    let motif = []

    if (motifType) {
        motif.push({
            label: t("Motif type"),
            value: motifType
        })
    }

    if (motifDescription) {
        motif.push({
            label: t("Description"),
            value: motifDescription
        })
    }

    if (depictedPeople.length) {
        motif.push({
            label: t("People depicted"),
            inline: false,
            values: depictedPeople
        })
    }

    if (depictedPlaces.length) {
        motif.push({
            label: t("Places depicted"),
            inline: false,
            values: depictedPlaces
        })
    }

    return (
        <ArticleBase>
            <ArticleHeader title={title || "Uten tittel"} />
            { images && <MediaSlideshow items={images} /> }

            <ArticleSection>
                <Metadata items={metadata} onSelect={_onSelect} />
            </ArticleSection>

            <ArticleTypography>{description}</ArticleTypography>

            { measures.length &&
                <ArticleSection title={t("Measures")}>
                    <Measures items={measures} />
                </ArticleSection>
            }

            { classifications && 
                <ArticleSection title={t("Classification")}>
                    <Classifications items={classifications} onSelect={_onSelect} />
                </ArticleSection>
            }

            { motif.length && 
                <ArticleSection title={t("Motif")}>
                    <Metadata items={motif} onSelect={_onSelect} />
                </ArticleSection>
            }

            { colors.length && 
                <ArticleSection title={t("Colors")}>
                    <Colors items={colors} onSelect={_onSelect} />
                </ArticleSection>
            }

            { events.length &&
                <ArticleSection title={t("History")}>
                    <Events items={events} />
                </ArticleSection>
            }


            <ArticleSection title={t("References")}>
                <Metadata items={references} />
            </ArticleSection>

        </ArticleBase>
    )


}

export default ArtworkPreview;