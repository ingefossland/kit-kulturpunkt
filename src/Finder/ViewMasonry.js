import React from 'react';
//import { Masonry } from "@kit-ui/admin"
import { Masonry, MasonryModule } from "../components/"
import { GridViewHeader, GridViewFooter, GridViewList, GridViewModule } from "../components"

import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import FinderModel from "./FinderModel"

const MasonryLayout = ({layout = "masonry", resultsLoaded, onPage, ...props}) => {

    return (
        <ResultsLoader {...props}>

            <GridViewHeader {...props} />

            <Masonry columns={4} spacing={2}>
                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <FinderModel model={model} {...props} key={index}>
                            <MasonryModule />
                        </FinderModel>
                    )
                })}
            </Masonry>
            <ResultsFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default MasonryLayout