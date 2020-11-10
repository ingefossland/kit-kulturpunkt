import React from 'react';
import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import FinderModel from "./FinderModel"

const ListLayout = ({children}) => {
    return <div>{children}</div>
}

const DocumentsList = ({layout = "list", resultsLoaded, onPage, ...props}) => {

    return (
        <ResultsLoader {...props}>
            <ListLayout padding={2}>
                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <FinderModel model={model} layout={layout} {...props} key={index} />
                    )
                })}
            </ListLayout>
            <ResultsFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default DocumentsList