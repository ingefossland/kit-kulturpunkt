import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchByUrl';
import qs from 'query-string';

import Bulk from "./Bulk"
import FinderLayout from "./FinderLayout"
import View from "./View"

const FinderQuery = ({url, query = {}, sortOptions = [], viewOptions = [], ...props}) => {

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // set query

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    let q = []

    query.q && q.push(query.q)
    sq.q && q.push(sq.q.trim() + "*")

    query = {
        ...query,
        url: url,
        collectionId: query.collectionId || app && app.collectionId,
        siteId: query.siteId || app && app.siteId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: query.fl || "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        q: q && q.join(" ") || undefined,
    };

    // query

    useEffect(() => {
        query.models && dispatch(getQuery(query))
    }, [url, query.models, query.q, sq.sort, sq.rows])

    // search

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url] || {}
    
    const _onPage = (page) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, page: page});
        props.history.replace(url)

        dispatch(getQuery({
            ...query,
            page: page
        }))
    }

    const _onCreate = () => {
        props.history.push(props.location.pathname + '/' + query.documentType + "/new")
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onRows = (rows) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, rows: rows});
        props.history.replace(url)

//        dispatch(getSort({sort}))

    }

    const _onSort = (sort) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, sort: sort});
        props.history.replace(url)

//        dispatch(getSort({sort}))

    }

    const _onView = (view) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, view: view});
        props.history.replace(url)

//        dispatch(getView({view}))

    }

    const view = sq.view || props.view || viewOptions && viewOptions[0] || "list"

    return (
        <p>{JSON.stringify(query)}</p>
    )

    return (
        <View {...finder} {...sq} {...props} {...currentSearch} view={view} onPage={_onPage} sortOptions={sortOptions} onSort={_onSort} onRows={_onRows} />
    )


}

FinderQuery.defaultProps = {
}

export default FinderQuery