import React from 'react';
import { MasonryView, MasonryModule } from "../components/PrimusView"

import FinderModel from "./FinderModel"

const FinderViewGallery = ({ size, resultsLoaded, prevPage, nextPage, onPage }) => {

    const header = prevPage && <MasonryModule placeholder maxWidth="100%" title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <MasonryModule placeholder maxWidth="100%" title="Next page" onClick={() => onPage(nextPage)} />

    const sizes = {
        "xs": 200,
        "sm": 300,
        "md": 400,
        "lg": 600,
        "xl": 800
    }

    const cols = {
        "xs": 6,
        "sm": 5,
        "md": 4,
        "lg": 3,
        "xl": 2
    }

    return (
        <MasonryView colSize={sizes[size]} cols={cols[size]} header={header} footer={footer} mediaSize={size} debug={true}>
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
                        <MasonryModule />
                    </FinderModel>
                )

            })}
        </MasonryView>
    )

}

export default FinderViewGallery