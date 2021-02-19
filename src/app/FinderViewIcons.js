import React from 'react';
import { IconsView, IconsModule } from "../components/KpView"

import FinderModel from "./FinderModel"

const FinderViewIcons = ({ resultsLoaded, prevPage, nextPage, onPage }) => {

    return (
        <IconsView>
            { prevPage && <IconsModule placeholder title="Prev page" onClick={() => onPage(prevPage)} />}
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <IconsModule />
                    </FinderModel>
                )
            })}
            { nextPage && <IconsModule placeholder title="Next page" onClick={() => onPage(nextPage)} />}
        </IconsView>
    )

}

export default FinderViewIcons