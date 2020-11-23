import React from 'react';
import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import FinderModel from "./FinderModel"

import ListViewHeader from "./ListViewHeader"
import ListViewFooter from "./ListViewFooter"

const ListLayout = ({children}) => {
    return <div>{children}</div>
}


const DocumentsList = ({layout = "list", resultsLoaded, onPage, ...props}) => {

    return (
        <ResultsLoader {...props}>
            <ListViewHeader {...props} />
            <ListLayout padding={2}>
                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <FinderModel model={model} layout={layout} {...props} key={index} />
                    )
                })}
            </ListLayout>
            <ListViewFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default DocumentsList