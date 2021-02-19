import React from 'react';
import { GalleryView, GalleryModule } from "../components/PrimusView"

import FinderModel from "./FinderModel"

const FinderViewGallery = ({ size, resultsLoaded, prevPage, nextPage, onPage }) => {

    const header = prevPage && <GalleryModule placeholder title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <GalleryModule placeholder title="Next page" onClick={() => onPage(nextPage)} />

    const sizes = {
        "xs": 200,
        "sm": 300,
        "md": 400,
        "lg": 600,
        "xl": 800
    }

    return (
        <GalleryView header={header} footer={footer} mediaSize={sizes[size]} debug={true}>
            { resultsLoaded && resultsLoaded.map((model, index) => {

                const image = model && model.content && model.content.media && model.content.media[0] && model.content.media[0].media
                const mediaWidth = model && model.mediaWidth || image && image.mediaWidth
                const mediaHeight = model && model.mediaHeight || image && image.mediaHeight

                model = {
                    ...model,
                    mediaWidth: mediaWidth,
                    mediaHeight: mediaHeight,
                }

                return (
                    <FinderModel {...model} key={index}>
                        <GalleryModule />
                    </FinderModel>
                )

            })}
        </GalleryView>
    )

}

export default FinderViewGallery