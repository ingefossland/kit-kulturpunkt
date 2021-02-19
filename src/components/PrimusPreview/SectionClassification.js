import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionClassifaction = ({classification = []}) => {

    if (!classification.length) {
        return false
    }

    const items = [
        {
            value: "Keramikk generelt (Outline - Keramikk- og glassproduksjon)",
            code: "OU 531"
        },
        {
            value: "Kunsthåndverk og formgiving (Outline)",
            code: "OU 531"
        }
    ]

    return (
        <ArticleSection title="Klassifikasjon">
            <Metadata items={items} />
        </ArticleSection>
    )


}

export default SectionClassifaction;