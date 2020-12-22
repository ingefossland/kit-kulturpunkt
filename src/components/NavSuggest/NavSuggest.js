import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import NavSuggestList from "./NavSuggestList"
import NavSuggestItem from "./NavSuggestItem"

const useStyles = makeStyles(theme => ({
    suggest: {
        display: "flex",
        width: "100%",
    },
}));

const NavSuggest = ({className, expanded = true, suggestions = [], children, onSelect}) => {

    const classes = useStyles()


    const renderSuggestions = () => {

        return (
            <NavSuggestList>
                {suggestions.map((item, index) => {
                    return (
                        <NavSuggestItem {...item} />
                    )
                })}
            </NavSuggestList>
        )

    }

    return (
        <nav className={className || classes.suggest} aria-expanded={expanded}>
            {suggestions && renderSuggestions()}
        </nav>
    )
}

NavSuggest.propTypes = {
    /** onSelect */
    onSelect: PropTypes.func
}

export default NavSuggest;