import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

import { GalleryView, GalleryModule } from "../components"
import FinderModel from "./FinderModel"

const ViewGallery = ({resultsLoaded = [], mediaHeight = 180, mediaLayout = "cover", ...props}) => {
    const { t, i18n } = useTranslation(['search']);

    const { query, start, isLoading, count, page, prevPage, nextPage, pages, onPage } = props

    // prev, next buttons
    
    if (resultsLoaded && prevPage) {

        resultsLoaded = [
            {
                role: "button",
                title: t('Page {{page}}', { page:prevPage }) + " ...",
                mediaWidth: mediaHeight,
                onClick: () => onPage(prevPage)
            },
            ...resultsLoaded
        ]

    }

    if (resultsLoaded && nextPage) {

        resultsLoaded = [
            ...resultsLoaded,
            {
                role: "button",
                title: t('Page {{page}}', { page:nextPage }) + " ...",
                mediaWidth: mediaHeight,
                onClick: () => onPage(nextPage)
            },
        ]

    }

    const title = props.title || t('{{count}} hits', { count });
    const description = t('{{page}} of {{pages}} pages', { pages, page });
    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')


    if (resultsLoaded.length && isLoading && query.start > start) {

        resultsLoaded.pop()

        resultsLoaded = [
            ...resultsLoaded,
            {
                role: "button",
                title: t('Loading page {{page}}', { page:nextPage }) + " ...",
                mediaWidth: mediaHeight,
            }
        ]
    
    } else if (resultsLoaded.length && isLoading) {

        resultsLoaded.shift()

        resultsLoaded = [
            {
                role: "button",
                title: t('Loading page {{page}}', { page:prevPage }) + " ...",
                mediaWidth: mediaHeight,
            },
            ...resultsLoaded,
        ]

    } else if (isLoading) {
        return <GalleryView title={loadingTitle} />
    } else if (!count) {
        return <GalleryView title={emptyTitle} />
    }

    return (
        <GalleryView {...props} pages={undefined} padding={0} spacing={2} title={title} description={description}>

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