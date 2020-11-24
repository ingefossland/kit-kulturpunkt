import React from 'react';
import ResultsLoader from "./ResultsLoader"
import FinderModel from "./FinderModel"

import { GridViewHeader, GridViewFooter, GridViewList, GridViewItem } from "../components"
import { GridModule } from "@kit-ui/admin"

const ListView = ({resultsLoaded, onPage, ...props}) => {

    const { resultsByPage, page } = props

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ResultsLoader {...props}>
            <GridViewHeader {...props} />
                <GridViewList>
                {pagedResults && pagedResults.map((model, index) => {

                    return (
                        <FinderModel model={model}>
                            <GridViewItem {...model} key={index} />
                        </FinderModel>
                    )
                })}
                </GridViewList>
            <GridViewFooter {...props} onPage={onPage} />
        </ResultsLoader>
    )

}

export default ListView