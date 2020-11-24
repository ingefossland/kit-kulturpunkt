import React from 'react';
import ResultsLoader from "./ResultsLoader"
import FinderModel from "./FinderModel"
import { GridViewHeader, GridViewFooter, GridViewList, GridViewModule } from "../components"

const ListView = ({resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <GridViewHeader {...props} />
                <GridViewList>
                {pagedResults && pagedResults.map((model, index) => {

                    return (
                        <FinderModel {...props} model={model} key={index}>
                            <GridViewModule />
                        </FinderModel>
                    )
                })}
                </GridViewList>
            <GridViewFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default ListView