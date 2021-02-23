import React from 'react';
import { TableView, TableModule } from "../components"
import { useHistory, useLocation } from "react-router-dom";
import FinderModel from "./FinderModel"
import qs from 'query-string';

const FinderViewGrid = ({size, resultsLoaded, prevPage, nextPage, onPage }) => {

    if (size < 25) {
        size = "small"
    } else if (size > 175) {
        size = "large"
    } else {
        size = "medium"
    }

    let cols = [
        "title",
        "status",
        "author",
        "documentType",
        "locale",
        "referenceCount",
        "updatedAt",
        "createdAt",
        "uniqueId",
    ]

    cols = ["header","footer"]

    const location = useLocation()
    const history = useHistory()

    const sq = location.search && qs.parse(location.search)

    const sort = sq.sort || undefined

    const _onSort = (sort) => {

        if (sort === sq.sort) {
            sort = sort + " DESC"
        }


        const url = location.pathname + "?" + qs.stringify({...sq, sort: sort});
        history.replace(url)
    }

    const header = prevPage && <TableModule cols={cols} placeholder title="Prev page" onClick={() => onPage(prevPage)} />
    const footer = nextPage && <TableModule cols={cols} placeholder title="Next page" onClick={() => onPage(nextPage)} />

    return (
        <TableView head={false} header={header} footer={footer} cols={cols} sort={sort} onSort={_onSort}>
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <TableModule size={size} cols={cols} sort={sort} />
                    </FinderModel>
                )
            })}
        </TableView>
    )

}

export default FinderViewGrid