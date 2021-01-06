import React, { useState } from "react"
import AppSearch from "./AppSearch"

export const AppSearchExample = (props) => {

    // search

    const [q, setQ] = useState(null)

    const _onChange = (q) => {
        setQ(q)
    }

    const _onReset = () => {
        setQ(null)
    }

    const [expanded, setExpanded] = useState(props.expanded || false)

    const _onToggle = () => {
        setExpanded(expanded => !expanded)
    }


    /*
    if (q) {
        suggestions.push({
            title: "Search for " + q
        })
    }
    */

    const searchState = {
        ...props,
//        expanded: expanded,
        onChange: _onChange,
        onToggle: _onToggle,
        onReset: _onReset,
        q: q
    }


    return (
        <AppSearch {...searchState} expanded={expanded} />
    )


}

export default AppSearchExample