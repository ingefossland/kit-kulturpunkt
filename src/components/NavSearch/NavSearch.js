import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import TextField from "@material-ui/core/TextField"
import InputBase from "@material-ui/core/InputBase"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",
    },
    field: {
        display: "flex",
        width: "100%",
        backgroundColor: "white",
        color: theme.palette.text.primary,
    },
    input: {
        backgroundColor: "transparent",
        flexGrow: 1,
        width: "100%",
        height: "100%",

        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        lineHeight: "1",
        color: "inherit",
        
        border: "none",
        outline: "none",

        "&:focus + *": {
            opacity: 1
        }
    },
    toggle: {
        marginLeft: theme.spacing(1),
    },
    reset: {
        marginRight: theme.spacing(1),
    }
}));

const NavSearch = ({
    id = "nav-search",
    className,
    expanded,
    InputProps = {},
    inputRef,
    inputProps = {},
    inputClassName,
    placeholder = "Search",
    value,
    onChange,
    onFocus,
    onBlur,
    onToggle,
    onReset
}) => {

    const classes = useStyles()

    const ButtonReset = () => {
        return (
            <IconButton className={classes.reset} onClick={onReset}>
                <CloseIcon />
            </IconButton>
        )
    }
    
    const ButtonToggle = () => {
        return (
            <IconButton className={classes.toggle} disableRipple disabled={!onToggle} onClick={onToggle}>
                <SearchIcon />
            </IconButton>
        )
    }

    const startAdornment = <ButtonToggle />
    const endAdornment = <ButtonReset />

    const ref = InputProps.ref

    if (inputProps.value) {
        value = inputProps.value
    }

    return (
        <InputBase
            aria-expanded={expanded}
            inputRef={inputRef}
            id={id}
            ref={ref}
            className={className || classes.field}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            startAdornment={startAdornment}
            endAdornment={endAdornment}
            inputProps={{
                ...inputProps,
                className: inputClassName || classes.input,
                'aria-label': 'Search',
            }}
        />        
    )

    /*
    
    return (
        <div className={className || classes.search} aria-expanded={expanded}>
            <div ref={InputProps.ref} className={fieldClassName || classes.field} aria-expanded={expanded || "false"}>
                <ButtonToggle onClick={_onToggle} disabled={!onToggle && true || false} />
                <input id={id} ref={inputRef} type="text"
                    placeholder={placeholder}
                    onChange={_onChange}
                    {...inputProps} 
                    className={inputClassName || classes.input} 
                    />
                {InputProps.endAdornment || <ButtonReset onClick={_onReset} /> }
            </div>
            {children}
        </div>
    )

    */
}

NavSearch.propTypes = {
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

export default NavSearch;