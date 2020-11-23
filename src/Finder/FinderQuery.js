import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchById';
import qs from 'query-string';

import FinderLayout from "./FinderLayout"

import List from "./ListView"
import Masonry from "./MasonryLayout"
import Gallery from "./GalleryLayout"
import ColumnView from "./ColumnView"

const templates = {
    "list": List,
    "masonry": Masonry,
    "gallery": Gallery,
    "media": Gallery,
    "column": ColumnView
}

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

    // template

    const layout = sq.view || viewOptions && viewOptions[0] || "list"

    if (!template && templates[layout]) {
        template = templates[layout]
    }
    
    const Template = template || List



    if (Template) {
        return (
            <FinderLayout {...finder} {...sq} onSelect={_onSelect} onView={_onView} onSort={_onSort} onRows={_onRows}>
                <Template {...props} {...currentSearch} layout={layout} onPage={_onPage} />
            </FinderLayout>
        )
        
    }


}

FinderQuery.defaultProps = {
}

export default FinderQuery