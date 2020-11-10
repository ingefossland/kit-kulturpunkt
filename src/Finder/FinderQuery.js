import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../redux/searchById';
import qs from 'query-string';

import List from "./ListLayout"
import Masonry from "./MasonryLayout"
import Gallery from "./GalleryLayout"

const templates = {
    "list": List,
    "masonry": Masonry,
    "gallery": Gallery,
    "media": Gallery,
}

const FinderQuery = ({query, layout = "list", ...props}) => {
    const dispatch = useDispatch()

    const { pathname, search } = props.location

    // query

    useEffect(() => {
        query && dispatch(getQuery(query))
    }, [pathname, query.q])

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

    // template

    const Template = templates && templates[layout] || templates["list"]

    if (Template) {
        return <Template {...props} {...currentSearch} onPage={_onPage} />
    }


}

FinderQuery.defaultProps = {
}

export default FinderQuery