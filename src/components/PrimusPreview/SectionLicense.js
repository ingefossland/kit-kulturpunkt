import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionHistory = ({licenses = []}) => {

    if (!licenses.length) {
        return false
    }

    const items = [
        {
            
        }
    ]

    return (
        <ArticleSection title="Lisensinformasjon">
            <Metadata items={items} />
        </ArticleSection>
    )


}

export default SectionHistory;