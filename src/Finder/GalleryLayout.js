import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Gallery } from "@kit-ui/admin"

import FinderModel from "./FinderModel"
import ResultsLoader from "./ResultsLoader"
import ResultsHeader from "./ResultsHeader"
import ResultsFooter from "./ResultsFooter"

const MediaGallery = ({layout = "gallery", resultsLoaded = [], onPage, mediaHeight = 180, mediaLayout = "cover", ...props}) => {

    return (
        <ResultsLoader {...props}>
            <ResultsHeader {...props} onPage={onPage} />
            <Gallery width="100%" padding={0} spacing={2}>
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
                        <FinderModel {...props} layout="gallery" model={model} width={model.width} key={index} />
                    )
                })}
            </Gallery>
            <ResultsFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )    
}

MediaGallery.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    models: PropTypes.array 
}

export default MediaGallery;