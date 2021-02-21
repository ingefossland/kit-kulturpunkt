import React from 'react';
import { MasonryView, MasonryModule } from "../components/KpView"

import FinderModel from "./FinderModel"

const FinderViewMasonry = ({ size, resultsLoaded, prevPage, nextPage, onPage }) => {

    const header = prevPage && <MasonryModule placeholder maxWidth="100%" title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <MasonryModule placeholder maxWidth="100%" title="Next page" onClick={() => onPage(nextPage)} />

    const colSize = 200 + size * 2

    return (
        <MasonryView colSize={colSize} header={header} footer={footer} mediaSize={size} debug={true}>
            { resultsLoaded && resultsLoaded.map((model, index) => {

                /*

                const image = model && model.content && model.content.media && model.content.media[0] && model.content.media[0].media
                const mediaWidth = model && model.mediaWidth || image && image.mediaWidth
                const mediaHeight = model && model.mediaHeight || image && image.mediaHeight

                model = {
                    ...model,
                    mediaWidth: mediaWidth,
                    mediaHeight: mediaHeight,
                }

                */

                return (
                    <FinderModel {...model} key={index}>
                        <MasonryModule />
                    </FinderModel>
                )

            })}
        </MasonryView>
    )

}

export default FinderViewMasonry