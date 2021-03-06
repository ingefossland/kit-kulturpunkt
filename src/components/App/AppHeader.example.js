import React, { useState } from "react"
import AppHeader from "./AppHeader"

export const AppHeaderExample = (props) => {

    // search

    const [search, setSearch] = useState(props.search)
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

    const searchState = search && {
        ...search,
        onChange: searchChange,
        onToggle: toggleSearch,
        onReset: resetSearch,
        q: searchQ
    }

    // subview

    const [subview, setSubview] = useState(props.subview)

    const toggleSubview = () => {
        setSubview({
            ...subview,
            expanded: !subview.expanded
        })
    }

    const subviewState = subview && {
        ...subview,
        onToggle: toggleSubview
    }

    // sidebar

    const [sidebar, setSidebar] = useState(props.sidebar)

    const toggleSidebar = () => {
        setSubview({
            ...sidebar,
            expanded: !sidebar.expanded
        })
    }

    const sidebarState = props.sidebar && {
        ...sidebar,
        onToggle: toggleSidebar
    }

    return (
        <AppHeader {...props} search={searchState} sidebar={sidebarState} subview={subviewState} />
    )
}

export default AppHeaderExample