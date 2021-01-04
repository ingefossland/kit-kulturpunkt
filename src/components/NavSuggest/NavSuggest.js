import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import NavSuggestGroup from "./NavSuggestGroup"
import NavSuggestItem from "./NavSuggestItem"

const useStyles = makeStyles(theme => ({
    overlay: {
        position: props => { return props.position },
        top: props => { return props.top },
        right: props => { return props.right},
        bottom: props => { return props.bottom },
        left: props => { return props.left},
        backgroundColor: "rgba(0,0,0,.25)",

        "&[aria-expanded=true]": {

        }

    },
    suggest: {
        backgroundColor: "white",
        boxShadow: theme.shadows[2],
//        display: "flex",
        width: "100%",
//        padding: theme.spacing(2, 0),

        "& > *": {
            padding: 0
        }

    },
}));

const NavSuggest = ({className, position = "relative", top = 0, right = 0, bottom = 0, left = 0, expanded = true, children}) => {

    const classes = useStyles({position, top, right, bottom, left})


    return (
        <div className={classes.overlay} aria-expanded={expanded}>
            <nav className={classes.suggest}>
                {children}
            </nav>
        </div>
    )
}

NavSuggest.propTypes = {
}

export default NavSuggest;