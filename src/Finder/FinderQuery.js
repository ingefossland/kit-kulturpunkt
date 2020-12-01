import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchByUrl';
import qs from 'query-string';

import Bulk from "./Bulk"
import FinderLayout from "./FinderLayout"
import View from "./View"

const FinderQuery = ({query = {}, viewOptions = [], template, ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // set query

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    let q = []

    query.q && q.push(query.q)
    sq.q && q.push(sq.q)

    query = {
        ...query,
        url: pathname,
        collectionId: app && app.collectionId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        q: q && q.join(" ") || undefined,
    };


    // query

    useEffect(() => {
        query && dispatch(getQuery(query))
    }, [pathname, query.q, sq.sort, sq.rows])

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

    const view = sq.view || finder.view || viewOptions && viewOptions[0] || "list"

    return (
        <Bulk>
            <FinderLayout {...finder} {...sq} onSelect={_onSelect} onView={_onView}>
                <View {...finder} {...sq} {...props} {...currentSearch} view={view} onPage={_onPage} onSort={_onSort} onRows={_onRows} />
            </FinderLayout>
        </Bulk>

    )



}

FinderQuery.defaultProps = {
}

export default FinderQuery