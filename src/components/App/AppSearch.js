import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import NavSearch from "../NavSearch/NavSearch"
import NavSuggest from "../NavSuggest/NavSuggest"

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        display: "flex",
        position: "relative",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",
    },
    field: {
        display: "flex",
        width: "100%",
        height: theme.spacing(8),
        backgroundColor: "white",
        color: theme.palette.text.primary,


    },
    input: {
        backgroundColor: "transparent",
        flexGrow: 1,
        height: "100%",
        width: "100%",

        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
        lineHeight: 1,
        color: "inherit",
        
        border: "none",
        outline: "none",
    },
    growingField: {
        position: "absolute",
        right: 0,
    
        backgroundColor: "white",
        color: theme.palette.text.primary,
        transition: ".125s ease-out",

        width: theme.spacing(16),
        height: theme.spacing(5),
        margin: theme.spacing(1.5),
        borderRadius: theme.spacing(2.5),

        "& > input": {
            fontSize: 16
        },

        "&[aria-expanded=true]": {
            borderRadius: 0,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            margin: 0,
            width: "100%",
            height: theme.spacing(8),

            "& > input": {
                fontSize: 18,
            },

            "& > input + button": {
                display: "block"
            }


        },

        "& > button": {
            margin: 0
        }

    },
    growingInput: {
        backgroundColor: "transparent",
        flexGrow: 1,
        height: "100%",

        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
        lineHeight: 1,
        color: "inherit",
        
        border: "none",
        outline: "none",

        "& + button": {
            display: "none"
        },

    },
    suggest: {
        borderTop: "1px solid",
        borderTopColor: theme.palette.divider,
        boxShadow: theme.shadows[2]
    },
    
}));


const AppSearch = ({
    id = "app-search",
    className,
    variant = "default",
    expanded,
    placeholder = "Search app",
    suggestions,
    value,
    onChange,
    onFocus,
    onBlur,
    onToggle,
    onReset,
    autocompleteProps,
    ...props}) => {

    const classes = useStyles()

    const inputRef = useRef(null)

    let fieldClassName = classes.field
    let inputClassName = classes.input

    if (variant === "growing") {
        fieldClassName = classes.growingField
        inputClassName = classes.growingInput
    }

    const _onFocus = (event) => {
        if (!expanded) {
            onToggle && onToggle()
        }

        onFocus && onFocus(event)
    }

    const _onBlur = (event) => {
        onBlur && onBlur(event)
    }

    const _onChange = (event) => {
        onChange && onChange(event.target.value, event)
    }
    
    if (!autocompleteProps) {
        return (
            <div className={className || classes.search} aria-expanded={expanded}>
                <NavSearch {...props}
                    id={id}
                    className={fieldClassName}
                    expanded={expanded}
                    inputRef={inputRef}
                    inputClassName={inputClassName}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    onChange={_onChange}
                    onToggle={onToggle}
                    onReset={onReset}
                    />
            </div>
        )

    }

    return (
        <div className={className || classes.search} aria-expanded={expanded}>
            <Autocomplete
                id={id + "-autocomplete"}
                fullWidth={true}
                {...autocompleteProps}

                renderInput={({InputProps, inputProps}) => {
                    return (
                        <NavSearch
                            InputProps={InputProps}
                            id={id}
                            className={fieldClassName}
                            expanded={expanded}
                            inputRef={inputRef}
                            inputProps={{
                                ...inputProps,
                                placeholder: placeholder
                            }}
                            inputClassName={inputClassName}
//                            onFocus={_onFocus}
//                            onBlur={_onBlur}
//                            onChange={_onChange}
                            onToggle={onToggle}
                            onReset={onReset}
                            />
                    )
                }}
            />        
        </div>
    )

    return (
        <NavSearch
            {...props}
            expanded={expanded}
            className={className || classes.search}>
            {expanded && suggestions && <NavSuggest className={classes.suggest} suggestions={suggestions} />}
        </NavSearch>
    )
}

AppSearch.defaultProps = {
    expanded: true,
    placeholder: "Search"
}

AppSearch.propTypes = {
    /** Expanded */
    expanded: PropTypes.bool,
    /** Placeholder */
    placeholder: PropTypes.string,
    /** Query */
    q: PropTypes.string,
    /** onChange */
    onChange: PropTypes.func,
    /** onToggle */
    onToggle: PropTypes.func,
    /** onReset */
    onReset: PropTypes.func
}

export default AppSearch;