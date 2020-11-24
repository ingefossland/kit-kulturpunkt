import React from 'react';
import ResultsLoader from "./ResultsLoader"
import FinderModel from "./FinderModel"

import { ListViewList, ListViewHeader, ListViewFooter, ListViewModule } from "../components"

const ListView = ({resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <ListViewList>
                <ListViewHeader {...props} />
                {pagedResults && pagedResults.map((model, index) => {

                    return (
                        <FinderModel {...props} model={model}>
                            <ListViewModule {...model} key={index} />
                        </FinderModel>
                    )
                })}
                <ListViewFooter {...props} onPage={onPage} />
            </ListViewList>
        </ResultsLoader>
    )

}

export default ListView