import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { toggleSearch, collapseSearch } from '../redux/app';
import { getQuery } from '../redux/searchByUrl';

import icons from "../icons"

import _ from "lodash"
import qs from 'query-string';

const PrimusSearch = ({children, ...props}) => {
    const { t, i18n } = useTranslation(['search']);

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const sq = location.search && qs.parse(location.search) || {}


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

        const pathname = location.pathname + "?" + query;
        const hash = location.hash;

        const url = hash && pathname + hash || pathname
        
        history.replace(url)
        
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

    // suggest from current location search

    const searchByUrl = useSelector(state => state.searchByUrl)

    const currentSearch = searchByUrl && searchByUrl[location.pathname] || {} 
    const currentResults = currentSearch && currentSearch.resultsLoaded

    const [suggest, setSuggest] = useState([])

    useEffect(() => {
        setSuggest(currentResults)
    }, [currentResults])


    // scopes

    const query = {}

    const searchRoot = "/"

    let scopes = [
        {
            icon: "search",
            placeholder: t("Search everything"),
            title: t("Search for {{q}} in everything", {q: "[q]"}),
            url: searchRoot,
            query: {
                ...query,
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
            history.replace(searchUrl)
        } else if (uniqueId) {
            history.replace(app.root + "/" + uniqueId + "/edit")
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

export default PrimusSearch