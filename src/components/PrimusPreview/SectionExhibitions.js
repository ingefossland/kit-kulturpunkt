import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionHistory = ({exhibitions = [], ...props}) => {

    if (!exhibitions.length) {
        return false
    }

    const _onSelect = (event, item) => {
        event.stopPropagation()
        props.onSelect && props.onSelect(item)
    }

    const items = exhibitions.map(item => {

        return {
            ...item,
            value: item.title,
            onClick: (e) => _onSelect(e, item)
        }

    })

    return (
        <ArticleSection title="Inngår i utstillinger">
            <Metadata items={items} />
        </ArticleSection>
    )


}

export default SectionHistory;