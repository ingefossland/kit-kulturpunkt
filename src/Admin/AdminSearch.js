import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getLayout, toggleSearch, toggleSidebar } from '../redux/app';
import { toggleMenuItem } from '../redux/finder';

import { NavSuggest, NavSuggestList, NavSuggestItem } from "../components/NavSuggest"

import _ from "lodash"
import qs from 'query-string';

const AdminSearch = ({children, ...props}) => {
    const { pathname } = props.location
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const search = app.search

    // search

    const [q, setQ] = useState("")

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

    // autocomplete

    const [searchInput, setSearchInput] = useState("")

    const scopeOptions = [
        {
            title: "Søk etter {q} i " + pathname,
            url: pathname
        },
        {
            title: "Søk etter {q} i hele KulturPunkt",
            url: "rootUrl"
        }
    ]

    const filterOptions = (options, params) => {

        const inputValue = params.inputValue

        let filteredOptions = []

        options.map(option => {
            const { title } = option;

            filteredOptions.push({
                ...option,
                title: title.replace("{q}", inputValue),
                q: inputValue
            })
        })

        return filteredOptions

    }

    const options = [
        ...scopeOptions
    ]

    const [value, setValue] = useState("")

    const _onOptionChange = (event, option, reason) => {
        setQ(option.q)
    }

    const _onInputChange = (event, option, reason) => {
        console.log("InputChange", value)
    }

    const renderOption = (option) => {
        return (
            <div>{ option.title }</div>
        )
    }

    const autocompleteProps = {
//        PaperComponent: NavSuggest,
//        open: search.expanded,
        options: options,
        getOptionLabel: (option) => option.q,
        renderOption: renderOption,
        filterOptions: filterOptions,
        onChange: _onOptionChange,
        onInputChange: _onInputChange
    }

    // search

    const searchProps = {
        ...search,
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