import React from 'react';
import { TableView, TableModule } from "../components/PrimusView"
import { useHistory, useLocation } from "react-router-dom";
import FinderModel from "./FinderModel"
import qs from 'query-string';

const FinderViewGrid = ({ size, resultsLoaded, prevPage, nextPage, onPage }) => {

    let cols = [
        "title",
        "artist",
        "dating",
        "materials",
        "techniques",
        "measures",
        "depictedPeople",
        "depictedPlaces",
        "identifier",
        "createdAt",
        "updatedAt",
    ]

    if (size === "xs") {
        cols = [
            "title",
            "artist",
            "dating",
            "identifier",
            "createdAt",
        ]
    }

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
        <TableView header={header} footer={footer} cols={cols} sort={sort} onSort={_onSort}>
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <TableModule cols={cols} sort={sort} />
                    </FinderModel>
                )
            })}
        </TableView>
    )

}

export default FinderViewGrid