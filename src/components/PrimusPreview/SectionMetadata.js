import React, { useEffect, useState } from "react"

import ArticleSection from "./ArticleSection"
import Metadata from "./Metadata"



const SectionMetadata = (props) => {

    const { name, uuid, producer, artist, identifier, designation, title, dating, measure, techniques, materials } = props

    const _onSelect = (event, item) => {
        event.stopPropagation()
        props.onSelect && props.onSelect(item)
    }
   
    let items = []
    
    identifier && items.push({
        name: "identifier",
        label: "Inventarnr.",
        value: identifier
    }) || uuid && items.push({
        name: "uuid",
        label: "UUID",
        value: uuid
    })

    designation && items.push({
        name: "designation",
        label: "Benevnelse",
        value: designation,
    })

    techniques && items.push({
        name: "measure",
        label: "Teknikk",
        values: techniques
    })

    materials && items.push({
        name: "material",
        label: "Materiale",
        values: materials
    })
    
    measure && items.push({
        name: "measure",
        label: "Mål",
        value: measure.value
    })

    return (
        <ArticleSection>
            <Metadata items={items} />
        </ArticleSection>
    )


}

export default SectionMetadata;