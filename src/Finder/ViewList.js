import React from 'react';
import ResultsLoader from "./ResultsLoader"
import FinderModel from "./FinderModel"

import { ListViewHeader, ListViewFooter, List, ListModule } from "../components"

const ListView = ({resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <List>
                <ListViewHeader {...props} />
                {pagedResults && pagedResults.map((model, index) => {

                    return (
                        <FinderModel {...props} model={model}>
                            <ListModule {...model} key={index} />
                        </FinderModel>
                    )
                })}
                <ListViewFooter {...props} onPage={onPage} />
            </List>
        </ResultsLoader>
    )

}

export default ListView