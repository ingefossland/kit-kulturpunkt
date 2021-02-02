import React from 'react';

import DefaultMap from "../KpPreview/DefaultMap"
import RoundtripMap from "../KpPreview/RoundtripMap"

const mapTypes = {
    "default": DefaultMap,
    "roundtrip": RoundtripMap
}

const MapPagePreview = ({formData: { content }, formContext, ...props}) => {

    const { links, mapLayout } = content

    const Template = mapLayout && mapTypes[mapLayout] || DefaultMap

    if (!links) {
        return <p>No links to display</p>
    }

    return <Template items={links} />

}

export default MapPagePreview

