import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchById';
import qs from 'query-string';

import FinderLayout from "./FinderLayout"
import FinderBulk from "./FinderBulk"
import FinderView from "./FinderView"

const FinderQuery = ({query = {}, viewOptions = [], template, ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // set query

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    query = {
        ...query,
        id: pathname,
        collectionId: app && app.collectionId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: "uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight",
        q: sq.q || undefined,
    };


    // query

    useEffect(() => {
        query && dispatch(getQuery(query))
    }, [pathname, query.q, sq.sort, sq.rows])

    // search

    const searchById = useSelector(state => state.searchById)
    const currentSearch = searchById && searchById[query.id] || {}
    
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

    const view = sq.view || viewOptions && viewOptions[0] || "list"

    return (
        <FinderBulk>
            <FinderLayout {...finder} {...sq} onSelect={_onSelect} onView={_onView} onSort={_onSort} onRows={_onRows}>
                <FinderView {...props} {...currentSearch} view={view} onPage={_onPage} />
            </FinderLayout>
        </FinderBulk>

    )



}

FinderQuery.defaultProps = {
}

export default FinderQuery