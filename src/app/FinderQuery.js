import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchByUrl';
import qs from 'query-string';

import FinderResults from "./FinderResults"

const FinderQuery = ({query = {}, sortOptions = [], viewOptions = [], ...props}) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const history = useHistory()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // set query

    const sq = location.search && qs.parse(location.search)

    let q = []

    query.q && q.push(query.q)
    sq.q && q.push(sq.q)

    q = q && q.join(" ") || undefined


    const url = location.pathname
    const page = sq.page || 1
    const rows = sq.rows || query.rows || 10
    const fl = query.fl || "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName"

    const sortable = [
        "title",
        "title DESC",
        "deletedAt",
        "deletedAt DESC",
        "createdAt",
        "createdAt DESC",
        "updatedAt",
        "updatedAt DESC"
    ]

    const sort = sq.sort || query.sort || undefined

    // query

    useEffect(() => {
        url && query.models && dispatch(getQuery({
            ...query,
            url: url,
            collectionId: query.collectionId || app && app.collectionId,
            siteId: query.siteId || app && app.siteId,
            page: page,
            rows: rows,
            sort: sort && sortable.includes(sort) && sort,
//            fl: fl,
            q: q,
        }))
    }, [url, q, sort, rows, page])

    // search

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[url] || {}
    
    return (
        <FinderResults {...sq} {...props} {...currentSearch}  />
    )

}

FinderQuery.defaultProps = {
}

export default FinderQuery