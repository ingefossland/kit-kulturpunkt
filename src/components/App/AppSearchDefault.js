import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: "64px",
        overflow: "hidden",
    },
    input: {
        backgroundColor: "transparent",
        flexGrow: 1,
        height: "100%",

        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),

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
        position: "absolute",
        zIndex: "2",
        top: "0",
        left: "0",
        margin: theme.spacing(1),
        "&[disabled]": {
            color: theme.palette.text.secondary
        }
    },
    reset: {
        position: "absolute",
        zIndex: "2",
        top: "0",
        right: "0",
        margin: theme.spacing(1),
    }
}));

const ButtonReset = ({className, onClick}) => {
    return (
        <IconButton className={className} onClick={onClick}>
            <CloseIcon />
        </IconButton>
    )
}

const ButtonToggle = ({className, disabled, onClick}) => {
    return (
        <IconButton disableRipple className={className} disabled={disabled} onClick={onClick}>
            <SearchIcon />
        </IconButton>
    )
}

const AppSearchDefault = ({className, variant, expanded = true, placeholder = "Search", q, onFocus, onChange, onToggle, onReset}) => {
    const inputRef = useRef(null);
    const classes = useStyles()

    const _onToggle = (event) => {
        onToggle && onToggle(event)
    }

    useEffect(() => {
        expanded && inputRef.current.focus()
    }, [expanded])

    const _onChange = (event) => {
        onChange && onChange(event.target.value, event);
//        onFocus && onFocus(event)
    }

    const _onReset = () => {
        if (inputRef.current && inputRef.current.value) {
            inputRef.current.value = ""
            onReset && onReset()
        } else if (onToggle) {
            onToggle()
        }

//        onReset && onReset()
    }

    return (
        <div className={className || classes.search} aria-expanded={expanded}>
            <ButtonToggle className={classes.toggle} onClick={_onToggle} disabled={!onToggle && true || false} />
            <input ref={inputRef} className={classes.input} type="text"
                placeholder={placeholder}
                onChange={_onChange} />
            <ButtonReset className={classes.reset} onClick={_onReset} />
        </div>
    )
}

AppSearchDefault.propTypes = {
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

export default AppSearchDefault;