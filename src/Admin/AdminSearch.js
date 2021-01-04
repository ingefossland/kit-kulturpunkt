import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { toggleSearch, collapseSearch } from '../redux/app';
import { getQuery } from '../redux/searchByUrl';

import { NavSuggest, NavSuggestGroup, NavSuggestGroupHeader, NavSuggestList, NavSuggestOption } from "../components/NavSuggest"

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

    const [q, setQ] = useState("")

    const _onSearchChange = _.debounce((q) => {
        setQ(q)
    }, 500)

    const _onSearchReset = () => {

        if (q) {
            setQ("")
            delete sq.q
        } else {
            dispatch(toggleSearch())
        }

    }

    // scopes

    const searchRoot = app.root + "/search"

    let scopeOptions = [
        {
            group: "search",
            placeholder: "All documents",
            label: "Search for {{q}} in all documents",
            url: searchRoot,
            query: {
                url: app && app.root && app.root + "?q=" + q,
                collectionId: app && app.collectionId,
                siteId: app && app.siteId,
                models: "documents",
                rows: 0,
                fl: "id",
            }
        }
    ]

    parents && parents.map((parent, index) => {

        if (parent.url && parent.url !== searchRoot) {
            scopeOptions.push({
                ...parent,
                query: {
                    url: parent.url + "/count",
                    collectionId: app && app.collectionId,
                    siteId: app && app.siteId,
                    rows: 0,
                    fl: "id",
                },
                group: "search",
                placeholder: "Everything in {{scope}}",
                label: "Search for {{q}} in {{scope}}",
            })
        }

    })

    // suggest

    const query = {
        url: app && app.root && app.root + "?q=" + q,
        collectionId: app && app.collectionId,
        siteId: app && app.siteId,
        models: "documents",
        page: 1,
        rows: 10,
        fl: "uniqueId,title,documentType",
    }


    useEffect(() => {
        q && dispatch(getQuery({
            ...query,
            q: q + "*"
        })) || dispatch(getQuery(query))


        scopeOptions.map(scope => {

            if (scope.query) {
                dispatch(getQuery({
                    ...scope.query,
                    q: q + "*"
                }))
            }

        })

    }, [q])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url] || {}
    const resultsLoaded = currentSearch && currentSearch.resultsLoaded

    const _filterOptions = (options, params) => {

        const { inputValue } = params


        let filteredOptions = []


        options.map(option => {
            const { group, uniqueId, title, url } = option;

            if (uniqueId) {
                filteredOptions.push({
                    ...option,
                    group: "suggest",
                    url: app.root + "/" + uniqueId + "/edit",
                    label: title,
                })
            } else if (group === "search") {
                filteredOptions.push({
                    ...option,
                    group: "search",
                    q: inputValue
                })
            } else {
                filteredOptions.push({
                    ...option,
                })
            }

        })

        return filteredOptions

    }


    const [options, setOptions] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {

        console.log('SUGGEST', resultsLoaded)

        if (resultsLoaded) {
            setOptions([
                ...scopeOptions,
                ...resultsLoaded,
            ])
        } else {
            setOptions([
                ...scopeOptions,
            ])
        }


    }, [resultsLoaded])

    useEffect(() => {
//        search.expanded && setOptions(defaultOptions) || setOptions([])
    }, [expanded])


    const _onOpen = () => {
        setOpen(true)
        setOptions(scopeOptions)
    }

    const _onClose = () => {
        setOpen(true)
        setOptions([])
    }


    const _onOptionChange = (event, option = {}, reason) => {
        console.log("onChange", option)
        console.log("onChange", reason)

        const q = event.target.value

        const { group, url } = option

        const searchUrl = url && q && url + "?q=" + q.replace(' ', '+')

        if (group === "search" && searchUrl) {
            props.history.replace(searchUrl)
        } else if (url) {
            props.history.replace(url)
        }

        dispatch(collapseSearch())

    }

    const _onInputChange = (event, option, reason) => {
        const q = event.target.value
        console.log("InputChange", q)
        _onSearchChange(q)
    }

    const _renderGroup = ({group, children}) => {

        const groupTitle = group === "suggest" && t('{{count}} suggestions', { count:children.length })

        if (groupTitle) {
            return (
                <li>
                    <NavSuggestGroup>
                        <NavSuggestGroupHeader>
                            {groupTitle}
                        </NavSuggestGroupHeader>
                        <NavSuggestList>{children}</NavSuggestList>
                    </NavSuggestGroup>
                </li>
            )
        } else {
            return <li><NavSuggestList>{children}</NavSuggestList></li>
        }

    }

    const _renderOption = (option = {}, state) => {

        let { group, documentType, title, label, placeholder, count, query, url } = option

        const { inputValue, selected } = state

        console.log("STATE", state)

        const search = query && query.url && searchByUrl && searchByUrl[query.url] || {}


        if (group === "search" && !inputValue) {
            label = t(placeholder, {scope: title})
            count = search && search.results && search.results.count
        } else {
            label = t(label, {scope: title, q: inputValue})
            count = search && search.results && search.results.count
        }

        const icon = documentType && icons[documentType]

        return <NavSuggestOption highlight={inputValue} label={label} count={count} icon={icon} />

    }

    const _getOptionLabel = (option) => {
        return option.q
    }

    const _getOptionSelected = (option, value) => {

        if (option.url === value.url) {
            return true
        }

        return false

    }

    const PaperComponent = ({children}) => {
        return <NavSuggest position="fixed" top={64} expanded={expanded}>{children}</NavSuggest>
    }

    const autocompleteProps = {
        open: expanded,
//        onOpen: _onOpen,
//        onClose: _onClose,
        freeSolo: true,
        disableClearable: true,
        options: options || scopeOptions,
        autoHighlight: true,
        disablePortal: true,
        PaperComponent: PaperComponent,
//        ListboxComponent: NavSuggestList,
        getOptionLabel: _getOptionLabel,
        getOptionSelected: _getOptionSelected,
        groupBy: (options) => options.group,
        renderGroup: _renderGroup,
        renderOption: _renderOption,
        filterOptions: _filterOptions,
        onChange: _onOptionChange,
        onInputChange: _onInputChange
    }

    // search

    const searchProps = {
        ...search,
//        ...autocompleteProps,
//        options: options,
        autocompleteProps: autocompleteProps,
//        onChange: _onSearchChange,
        onReset: () => _onSearchReset(),
        onToggle: () => dispatch(toggleSearch())
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