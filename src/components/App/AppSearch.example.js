import React, { useState } from "react"
import AppSearch from "./AppSearch"

export const AppSearchExample = ({options, suggest, ...props}) => {

    // search

    const [q, setQ] = useState(null)

    const _onChange = (q) => {
        setQ(q)
    }

    const _onReset = () => {
        setQ(null)
    }

    const [expanded, setExpanded] = useState(props.expanded)

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
        expanded: expanded,
        onChange: _onChange,
        onToggle: _onToggle,
        onReset: _onReset,
        q: q
    }


    if (options || suggest) {


        const filterOptions = (options, params) => {

            const filtered = options
        
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }
    
            return filtered;
        
        }


        const autocompleteProps = {
            options: options,
            getOptionLabel: (option) => option.title,
            filterOptions: (options, params) => options
        }


        return (
            <AppSearch {...searchState} autocompleteProps={autocompleteProps} />
        )


    } else {

        return (
            <AppSearch {...searchState} />
        )
    

    }


}

export default AppSearchExample