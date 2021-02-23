import React from 'react';
import { ListView, ListModule, ViewPages } from "../components"
import FinderModel from "./FinderModel"

const FinderViewList = ({size, results, resultsLoaded, page, pages, prevPage, nextPage, onPage }) => {

    if (size < 25) {
        size = "small"
    } else if (size > 175) {
        size = "large"
    } else {
        size = "medium"
    }

    const models = results && results.models
    const nav = <ViewPages page={page} pages={pages} onPage={onPage} />

    return (
        <ListView footer={nav}>
            {  models && models.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <ListModule size={size} />
                    </FinderModel>
                )
            })}
        </ListView>
    )


    const header = prevPage && <ListModule placeholder title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <ListModule placeholder title="Next page" onClick={() => onPage(nextPage)} />

    return (
        <ListView header={header} footer={footer}>
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <ListModule />
                    </FinderModel>
                )
            })}
        </ListView>
    )

}

export default FinderViewList