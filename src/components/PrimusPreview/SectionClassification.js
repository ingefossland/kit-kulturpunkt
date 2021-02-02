import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionClassifaction = ({classification = []}) => {

    if (!classification.length) {
        return false
    }

    const items = [
        {
            
        }
    ]

    return (
        <ArticleSection title="Klassifikasjon">
            <Metadata items={items} />
        </ArticleSection>
    )


}

export default SectionClassifaction;