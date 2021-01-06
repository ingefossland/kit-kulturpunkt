import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import NavSearch from "../NavSearch/NavSearch"

import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { matchSorter } from 'match-sorter'
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

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

//        textOverflow: "ellipsis",
//        overflow: "hidden",
        
        border: "none",
        outline: "none",

        "& + button": {
            display: "none"
        },

    },
    suggestRoot: {

        "& > $suggestPopper": {
            marginTop: 0
        },

        "&[aria-expanded=true]": {

            "& > $suggestPopper": {
                marginTop: 64
            }

        }
    },
    suggestOverlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: ".125s ease-out",
        backgroundColor: "rgba(0,0,0,.25)",
        pointerEvents: "none",
        opacity: 0,
        "&[aria-expanded=true]": {
            opacity: 1,
            pointerEvents: "all",
        }
    },
    suggestPopper: {
        position: "fixed",
        marginTop: 64,
        width: "100%",
    },
    suggestPaper: {
        width: "100%",
        padding: 0,
        margin: 0,
        borderRadius: 0,
//        borderTop: "1px solid",
        borderTopColor: theme.palette.divider,
        boxShadow: theme.shadows[2]
    },
    suggestList: {
        paddingTop: 8,
        paddingBottom: 8
    },
    suggestListItem: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
    },
    suggestIcon: {
        "& + $suggestLabel": {
            marginLeft: 16
        }
    },
    suggestLabel: {
        flexGrow: 1,
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14
    },
    suggestCount: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
        color: theme.palette.text.secondary
    },
    suggestQuery: {
        textDecoration: "underline",
        "&:before": {
            content: '"«"'
        },
        "&:after": {
            content: '"»"'
        },
    },

    suggestGroupList: {
        padding: 0,
        margin: 0,

        "& > $suggestListItem": {
            paddingLeft: 16
        },

    },
    suggestGroupLabel: {
        borderTop: "1px solid",
        marginTop: 8,
        paddingTop: 16,
        paddingLeft: 16,
        marginBottom: 8,
        borderTopColor: theme.palette.divider,
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
        fontWeight: "normal",
        textTransform: "capitalize",
        color: theme.palette.text.secondary


    },
    
}));


const AppSearch = ({
    id = "app-search",
    className,
    variant = "default",
    expanded,
    placeholder = "Search app",
    icons,
    options,
    scopes,
    suggest,
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

    if (options) {

        autocompleteProps = {
            options: options,
            ...autocompleteProps
        }

    }

    if (autocompleteProps) {

        // keep query options

        const scopeOptions = autocompleteProps.options.filter(option => option.query)
        const suggestOptions = autocompleteProps.options.filter(option => !option.query)

        const _filterOptions = (options, state) => {
            const { inputValue, selected } = state

            // keep query options

//            let query = options.filter(option => option.query)
//            let items = options.filter(option => !option.query)

            const baseSort = (a, b) => ( a.modelName < b.modelName ? -1: 1 )

            let filtered = matchSorter(suggestOptions, inputValue, { keys: ['title'], baseSort: baseSort })

            /*

            if (state.inputValue !== '') {
              filtered.push({
                inputValue: state.inputValue,
                title: `Add "${state.inputValue}"`,
              });
            }

            */

            if (scopeOptions) {
                filtered = [
                    ...scopeOptions,
                    ...filtered
                ]
            }

            return filtered;
        
        }
    
        const _getOptionLabel = (option) => {
            return option.q
        }
   
        const _getOptionHighlight = (label, q) =>  {

            const matches = match(label, q);
            const parts = parse(label, matches);
        
            return parts.map((part, index) => {
                if (part.highlight) {
                    return <b className={classes.suggestHighlight}>{part.text}</b>
                }
                return part.text
            })

        }

        const _getOptionQuery = (label, q) =>  {

            const matches = match(label, "[q]");
            const parts = parse(label, matches);
        
            return parts.map((part, index) => {
                if (part.highlight) {
                    return <b className={classes.suggestQuery}>{q}</b>
                }
                return part.text
            })

        }

        const _renderGroup = ({group, children}) => {

            if (group) {
                return (
                    <li>
                        <div className={classes.suggestGroupLabel}>{group}</div>
                        <ul className={classes.suggestGroupList}>{children}</ul>
                    </li>
                )
            }

            return children

        }

        const _renderOption = (option = {}, state) => {
            const { inputValue, selected } = state
    
            let { uniqueId, documentType, query, icon, placeholder, title, count } = option
    
            if (!icon && icons && icons[documentType]) {
                icon = icons[documentType]
            }

            // highlight

            const label = inputValue == '' && placeholder || query && _getOptionQuery(title, inputValue) || _getOptionHighlight(title, inputValue)
    
            return (
                <>
                    {icon && <Icon className={classes.suggestIcon}>{icon}</Icon>}
                    <Typography className={classes.suggestLabel}>
                        {label}
                    </Typography>
                    { count && <Typography className={classes.suggestCount}>{count}</Typography> }
                </>
            ) 
    
        }

        return (
            <div className={className || classes.search} aria-expanded={expanded}>
                <div className={classes.suggestOverlay} aria-expanded={expanded} onClick={onToggle}></div>
                <Autocomplete
                    id={id + "-suggest"}
                    classes={{
                        root: classes.suggestRoot,
                        popper: classes.suggestPopper,
                        paper: classes.suggestPaper,
                        listbox: classes.suggestList,
                        option: classes.suggestListItem,
                        groupUl: classes.suggestGroupList,
                        groupLabel: classes.suggestGroupLabel,
                    }}
                    fullWidth={true}
                    disablePortal={true}
                    open={expanded || false}
                    filterOptions={_filterOptions}
                    renderGroup={_renderGroup}
                    renderOption={_renderOption}
                    getOptionLabel={_getOptionLabel}
        
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

    }

    // default search
    
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