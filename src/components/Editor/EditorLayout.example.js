import React, { useState } from "react"
import EditorLayout from "./EditorLayout"

export const AppLayoutExample = ({children, ...props}) => {

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

    return (
        <EditorLayout {...props} search={searchState} subview={subviewState}>
            {children}
        </EditorLayout>
    )
}

export default AppLayoutExample