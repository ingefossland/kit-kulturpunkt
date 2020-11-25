import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

import { Gallery, GalleryModule } from "../components"
import { GridViewHeader } from "../components"

import FinderModel from "./FinderModel"
import ResultsLoader from "./ResultsLoader"
import ResultsHeader from "./ResultsHeader"
import ResultsFooter from "./ResultsFooter"

const MediaGallery = ({layout = "gallery", resultsLoaded = [], onPage, mediaHeight = 180, mediaLayout = "cover", ...props}) => {
    const { t, i18n } = useTranslation(['search']);

    if (resultsLoaded && props.prevPage) {

        resultsLoaded = [
            {
//                icon: "arrow_back",
                role: "button",
                title: t('Page {{page}}', { page:props.prevPage }) + " ...",
                mediaWidth: mediaHeight,
                onClick: () => onPage(props.prevPage)
            },
            ...resultsLoaded
        ]

    }

    if (resultsLoaded && props.nextPage) {

        resultsLoaded = [
            ...resultsLoaded,
            {
//                icon: "arrow_forward",
                role: "button",
                title: t('Page {{page}}', { page:props.nextPage }) + " ...",
                mediaWidth: mediaHeight,
                onClick: () => onPage(props.nextPage)
            },
        ]

    }

    return (
        <ResultsLoader {...props}>
            <GridViewHeader {...props} />
            <Gallery padding={0} spacing={2}>

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
                        <FinderModel {...props} layout="gallery" model={model} width={model.width} onClick={model && model.onClick} key={index}>
                            <GalleryModule />
                        </FinderModel>
                    )
                })}
            </Gallery>
        </ResultsLoader>
    )    
}

MediaGallery.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    models: PropTypes.array 
}

export default MediaGallery;