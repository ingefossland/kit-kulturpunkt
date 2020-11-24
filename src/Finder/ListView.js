import React from 'react';
import ResultsLoader from "./ResultsLoader"
import FinderModel from "./FinderModel"

import { ListViewList, ListViewHeader, ListViewFooter, ListViewItem } from "../components"

const ListView = ({resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <ListViewList>
                <ListViewHeader {...props} />
                {pagedResults && pagedResults.map((model, index) => {

                    return (
                        <FinderModel model={model}>
                            <ListViewItem {...model} key={index} />
                        </FinderModel>
                    )
                })}
                <ListViewFooter {...props} onPage={onPage} />
            </ListViewList>
        </ResultsLoader>
    )

}

export default ListView