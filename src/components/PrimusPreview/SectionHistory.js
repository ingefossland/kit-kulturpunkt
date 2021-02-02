import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionHistory = ({events = []}) => {

    if (!events.length) {
        return false
    }

    return (
        <ArticleSection title="Historikk">
            <Metadata items={events} />
        </ArticleSection>
    )


}

export default SectionHistory;