import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        backgroundColor: "#ccc",
        color: "black",
        width: "100%",
        height: "64px",
        overflow: "hidden",
    },
    
    searchInput: {
        backgroundColor: "transparent",
        flexBasis: "100%",
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
    buttonToggle: {
        position: "absolute",
        zIndex: "2",
        top: "0",
        left: "0",
        margin: theme.spacing(1),
        "&[disabled]": {
            color: theme.palette.text.secondary
        }
    },
    buttonReset: {
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

const AppSearchBase = ({className, expanded, variant, placeholder = "Search", value, onFocus, onChange, onToggle, onReset, ...props}) => {

    const inputRef = useRef(null);

    const classes = useStyles()


    return (
        <div className={className || classes.root} data-variant={variant} aria-expanded={expanded}>
            <ButtonToggle className={classes.buttonToggle} onClick={onToggle} disabled={!onToggle && true || false} />
            <input ref={inputRef} className={classes.searchInput} type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange} />
            <ButtonReset className={classes.buttonReset} onClick={onReset} />
        </div>
    )
}

AppSearchBase.propTypes = {
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

export default AppSearchBase;