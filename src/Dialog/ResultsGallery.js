import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Gallery } from "@kit-ui/admin"

import DialogModel from "./DialogModel"
import ResultsLoader from "./ResultsLoader"
import ResultsHeader from "./ResultsHeader"
import ResultsFooter from "./ResultsFooter"

const LayoutGallery = ({children}) => {
    return children
}


const ResultsGallery = ({layout = "gallery", query = {}, results = {}, resultsLoaded = [], selected = [], onPage, mediaHeight = 120, mediaLayout = "cover", spacing = 1, padding = 2, ...props}) => {

    return (
        <ResultsLoader query={query} results={results}>
            <Gallery padding={padding} spacing={spacing}>
                { resultsLoaded && resultsLoaded.map((model, index) => {

                    let width, height;
                        
                    if (model.mediaWidth && model.mediaHeight) {
                        width = model.mediaWidth
                        height = model.mediaHeight
                    } else if (model.imageWidth && model.imageHeight) {
                        width = model.imageWidth
                        height = model.imageHeight
                    }

                    model = {
                        ...model,
                        width: Math.floor(mediaHeight * (width / height)) || mediaHeight,
                        mediaHeight: mediaHeight,
                        mediaLayout: mediaLayout
                    }

                    return (
                        <DialogModel {...props} layout="gallery" model={model} modelsSelected={selected} width={model.width} key={index} />
                    )
                })}
            </Gallery>
            <ResultsFooter {...results} onPage={onPage} />
        </ResultsLoader>
    )    
}

ResultsGallery.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    models: PropTypes.array 
}

export default ResultsGallery;