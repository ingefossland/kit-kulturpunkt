import React, { useState } from "react"
import AppSearch from "./AppSearch"

export const AppSearchExample = (props) => {

    // search

    const [search, setSearch] = useState(props)
    const [searchQ, setSearchQ] = useState(null)

    const searchChange = (q) => {
        setSearchQ(q)
    }

    const resetSearch = () => {
        setSearchQ(null)
        if (!searchQ) {
            toggleSearch()
        }
    }

    const toggleSearch = () => {
        setSearch({
            ...search,
            expanded: !search.expanded
        })
    }

    const searchState = {
        ...props,
        onChange: searchChange,
        onToggle: toggleSearch,
        onReset: resetSearch,
        q: searchQ
    }


    return (
        <AppSearch {...searchState} />
    )
}

export default AppSearchExample