import React from 'react';
//import { ListLayout } from "@kit-ui/admin"

import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import DialogModel from "./DialogModel"

const ListLayout = ({children}) => {
    return <div>{children}</div>
}

const ResultsList = ({layout = "list", query = {}, results = {}, resultsLoaded = [], selected = [], onPage, ...props}) => {

    return (
        <ResultsLoader query={query} results={results}>
            <ListLayout padding={2}>
                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <DialogModel model={model} layout={layout} modelsSelected={selected} {...props} key={index} />
                    )
                })}
            </ListLayout>
            <ResultsFooter {...results} onPage={onPage} />
        </ResultsLoader>
    )

}

export default ResultsList