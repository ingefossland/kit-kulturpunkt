import React from 'react';
import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import FinderModel from "./FinderModel"

import ListViewHeader from "./ListViewHeader"
import ListViewFooter from "./ListViewFooter"

const ListLayout = ({children}) => {
    return <div>{children}</div>
}


const ListView = ({layout = "list", resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <ListViewHeader {...props} />
            <ListLayout padding={2}>
                {pagedResults && pagedResults.map((model, index) => {
                    return (
                        <FinderModel model={model} layout={layout} {...props} key={index} />
                    )
                })}
            </ListLayout>
            <ListViewFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default ListView