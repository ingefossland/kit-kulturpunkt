import React from 'react';
//import { Masonry } from "@kit-ui/admin"
import Masonry from "../components/Masonry/Masonry"

import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import FinderModel from "./FinderModel"


const MasonryLayout = ({layout = "masonry", resultsLoaded, onPage, ...props}) => {

    return (
        <ResultsLoader {...props}>
            <Masonry columns={4} spacing={2}>
                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <FinderModel model={model} layout={layout} {...props} key={index} />
                    )
                })}
            </Masonry>
            <ResultsFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default MasonryLayout