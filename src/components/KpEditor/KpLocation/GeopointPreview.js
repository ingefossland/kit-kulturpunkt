import React, { useState, useEffect } from 'react';
import GeopointMap from "./GeopointMap"
import GeopointMapCenter from "./GeopointMapCenter"

const GeopointPreview = ({id = "map", location, onClick}) => {
    const { lat, lng, zoom } = location

    const center = {
        lat: lat,
        lng: lng
    }

    return (
        <GeopointMap id={id + "-preview"} center={center} zoom={zoom} onClick={onClick}>
            <GeopointMapCenter />
        </GeopointMap>
    )        
}

GeopointPreview.defaultProps = {
}

export default GeopointPreview;