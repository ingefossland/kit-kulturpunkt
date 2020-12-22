import React, { useState } from "react"
import AppLayout from "./AppLayout"

export const AppLayoutExample = ({search, children, ...props}) => {

    // search

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

    const [searchExpanded, setSearchExpanded] = useState(search && search.expanded)

    const toggleSearch = () => {
        setSearchExpanded(expanded => !expanded)
    }

    const searchState = search && {
        ...search,
        expanded: searchExpanded,
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
        setSidebar({
            ...sidebar,
            expanded: !sidebar.expanded
        })
    }

    const sidebarState = props.sidebar && {
        ...sidebar,
        onToggle: toggleSidebar
    }

    return (
        <AppLayout {...props} search={searchState} sidebar={sidebarState} subview={subviewState}>
            {children}
        </AppLayout>
    )
}

export default AppLayoutExample