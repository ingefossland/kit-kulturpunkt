import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { toggleSearch, collapseSearch } from '../redux/app';
import { getQuery } from '../redux/searchByUrl';

import icons from "../icons/"

import _ from "lodash"
import qs from 'query-string';

const AdminSearch = ({children, ...props}) => {
    const { t, i18n } = useTranslation(['search']);

    const { pathname } = props.location
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const search = app.search
    const expanded = search && search.expanded

    const finder = useSelector(state => state.finder)
    const parents = finder.parents
    const parent = finder.parent


    // search

    const [inputValue, setInputValue] = useState(sq.q)
    const [q, setQ] = useState(sq.q)

    const _onQuery = _.debounce((q, event) => {
        setQ(q)
    }, 500)

    useEffect(() => {
        if (q) {
            sq.q = q.replace(' ', '+')
        } else {
            delete sq.q
        }

        let query = qs.stringify(sq)

        const pathname = props.location.pathname + "?" + query;
        const hash = props.location.hash;

        const url = hash && pathname + hash || pathname
        
        if (props.history) {
            props.history.replace(url)
        }
        
    }, [q])

    const _onReset = () => {

        console.log('onReset')

        if (inputValue) {
            setInputValue("")
            setQ("")
            delete sq.q
        } else {
            dispatch(toggleSearch())
        }

    }

    const _onToggle = () => {
        setInputValue(sq.q || "")
        dispatch(toggleSearch())
    }

    const _onClickOutside = () => {
        dispatch(toggleSearch())
    }

    // suggest

    const searchRoot = app.root + "/search"

    const rootQuery = {
        url: searchRoot,
        collectionId: app && app.collectionId,
        siteId: app && app.siteId,
        models: "documents",
        page: 1,
        rows: 100,
    }

    const documentsQuery = {
        ...rootQuery,
        url: searchRoot + "/documents",
        models: "documents",
        fl: "uniqueId,title,documentType",
    }

    const mediaQuery = {
        ...rootQuery,
        url: searchRoot + "/media",
        models: "media",
        fl: "uniqueId,title,mediaType",
    }

    useEffect(() => {
        dispatch(getQuery(documentsQuery))
        dispatch(getQuery(mediaQuery))
    }, [])

    const searchByUrl = useSelector(state => state.searchByUrl)

    const documentsSearch = searchByUrl && searchByUrl[documentsQuery.url] || {}
    const documentsSuggest = documentsSearch && documentsSearch.resultsLoaded

    const mediaSearch = searchByUrl && searchByUrl[mediaQuery.url] || {}
    const mediaSuggest = mediaSearch && mediaSearch.resultsLoaded

    let suggest = []

    if (documentsSuggest) {
        suggest = [
            ...documentsSuggest,
        ]
    }

    if (mediaSuggest) {
        suggest = [
            ...suggest,
            ...mediaSuggest,
        ]
    }
    
    // scopes


    let scopes = [
        {
            icon: "search",
            placeholder: t("Search everything"),
            title: t("Search for {{q}} in everything", {q: "[q]"}),
            url: searchRoot,
            query: {
                ...rootQuery,
                url: searchRoot,
            }
        }
    ]

    if (parent && parent.url && parent.url !== searchRoot) {

        const query = {
            ...parent.query,
            collectionId: app && app.collectionId,
            siteId: app && app.siteId,
            url: parent.url
        }

        scopes.push({
            ...parent,
            query: query,
            icon: "search",
            placeholder: t("Everything in {{scope}}", {scope: parent.title}),
            title: t("Search for {{q}} in {{scope}}", {q: "[q]", scope: parent.title}),
        })
    }

    // options


    let options = scopes.map(scope => {

        const count = searchByUrl && searchByUrl[scope.query.url] && searchByUrl[scope.query.url].results && searchByUrl[scope.query.url].results.count || "-"

        return {
            ...scope,
            count: count
        }

    })

    if (suggest) {
        options = [
            ...options,
            ...suggest
        ]
    }


    const _onChange = (event, option = {}, reason) => {
        console.log("onChange", option)
        console.log("onChange", reason)

        const { query, uniqueId, url } = option

        const searchUrl = url && query && url + "?q=" + inputValue.replace(' ', '+')

        if (searchUrl) {
            props.history.replace(searchUrl)
        } else if (uniqueId) {
            props.history.replace(app.root + "/" + uniqueId + "/edit")
        }

        dispatch(collapseSearch())

    }

    const _onInputChange = (event, option, reason) => {
        const value = event && event.target.value || ""
        value && setInputValue(event.target.value)
//        value && _onQuery(value)
    }

    const autocompleteProps = {
        open: expanded,
        freeSolo: true,
        disableClearable: true,
        options: options,
        autoHighlight: true,
        disablePortal: true,
        inputValue: inputValue,
        groupBy: (options) => options.modelName,
//        filterOptions: _filterOptions,
        onChange: _onChange,
        onInputChange: _onInputChange
    }

    // search

    const searchProps = {
        ...search,
        autocompleteProps: autocompleteProps,
        onReset: () => _onReset(),
        onToggle: () => _onToggle()
    }

    // merge with children

    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
                search: searchProps,
                ...props
            });
        }
        return child;
    });

    return (
        <>
            {childrenWithProps}
        </>
    )

    
}

export default AdminSearch