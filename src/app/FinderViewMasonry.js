import React from 'react';
import { MasonryView, MasonryModule } from "../components/KpView"

import FinderModel from "./FinderModel"

const FinderViewMasonry = ({ size, resultsLoaded, prevPage, nextPage, onPage }) => {

    const header = prevPage && <MasonryModule placeholder maxWidth="100%" title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <MasonryModule placeholder maxWidth="100%" title="Next page" onClick={() => onPage(nextPage)} />

    const columnSize = 200 + size * 2

    return (
        <MasonryView columnSize={columnSize} header={header} footer={footer} debug={true}>
            { resultsLoaded && resultsLoaded.map((model, index) => {

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