import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

import { GalleryView, GalleryModule } from "../components"
import FinderModel from "./FinderModel"

const ViewGallery = ({resultsLoaded = [], mediaHeight = 180, mediaLayout = "cover", ...props}) => {
    const { t, i18n } = useTranslation(['search']);

    const { count, page, pages, onPage } = props

    if (resultsLoaded && props.prevPage) {

        resultsLoaded = [
            {
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
                role: "button",
                title: t('Page {{page}}', { page:props.nextPage }) + " ...",
                mediaWidth: mediaHeight,
                onClick: () => onPage(props.nextPage)
            },
        ]

    }

    const title = props.title || t('{{count}} hits', { count });
    const description = t('{{page}} of {{pages}} pages', { pages, page });
    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')


    return (
        <GalleryView {...props} padding={0} spacing={2} loadingTitle={loadingTitle} emptyTitle={emptyTitle} title={title} description={description}>

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
        </GalleryView>
    )    
}

export default ViewGallery;