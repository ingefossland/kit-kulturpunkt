import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        zIndex: 2,
        position: "relative",
        backgroundColor: "transparent",
        color: "black",
        height: "36px",
        overflow: "hidden",
        fontFamily: "Akkurat, sans-serif",
        margin: "12px"
    },
    searchInput: {
        backgroundColor: "white",
        flexBasis: "100%",
        padding: "9px 42px",
        border: "1px solid",
        borderColor: "#ccc",
        borderRadius: "18px",
        fontFamily: "inherit",
        fontSize: "14px",
        lineHeight: "18px",
        color: "inherit",
        outline: "none",

        "&:focus + *:first-child": {
            opacity: 1
        }
    },
    searchIcon: {
        position: "absolute",
        pointerEvents: "none",
        zIndex: 2,
        top: "0",
        left: "0",
        fontSize: "20px",
        lineHeight: "24px",
        width: '20px',
        height: '20px',
        padding: "0",
        margin: "8px 13px",
        opacity: ".5"
    },
    resetButton: {
        position: "absolute",
        zIndex: 3,
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    resetIcon: {
        width: '20px',
        height: '20px',
    }
}));

const SearchReset = ({onClick}) => {
    const classes = useStyles()

    return (
        <ButtonBase className={classes.resetButton} onClick={onClick}>
            <CloseIcon className={classes.resetIcon} />
        </ButtonBase>
    )
}

const WidgetSearch = ({className, placeholder = "Search", q, onChange, onReset}) => {
    const [value, setValue] = useState(q);

    useEffect(() => {
        setValue(q);
    },[q])

    const classes = useStyles()

    const handleChange = (event) => {
        setValue(event.target.value);

        if (onChange) {
            onChange(event.target.value, event)
        }

    }

    const handleReset = (event) => {
        setValue("");

        if (onReset) {
            onReset(event)
        } else if (onChange) {
            onChange("", event)
        }

    }

    return (
        <nav className={className || classes.root}>
            <input className={classes.searchInput} type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleChange} />
            <SearchIcon className={classes.searchIcon} />
            { value && <SearchReset className={classes.buttonReset} onClick={handleReset} /> }
        </nav>
    )
}

WidgetSearch.propTypes = {
    placeholder: PropTypes.string,
    q: PropTypes.string,
    onChange: PropTypes.func,
    onReset: PropTypes.func
}

export default WidgetSearch;