import React, { useState, useEffect } from 'react';
import { AppSearch, NavTabs } from '@kit-ui/admin';
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash"

const useStyles = makeStyles(theme => ({
    search: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        display: "flex",
        backgroundColor: "inherit",
        color: "black",
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",

        transition: ".125s ease-out",
        marginTop: theme.spacing(-8),

        "&[aria-expanded=true]": {
            marginTop: 0,
 
            "& + *": {
                marginTop: theme.spacing(8),
            }
    
        },

 
    },
}));


const DialogSearch = ({placeholder, q, onChange, onReset, expanded = false}) => {
    const classes = useStyles()

    return (
        <AppSearch className={classes.search} placeholder={placeholder} onChange={onChange} onReset={onReset} expanded={expanded} />
    )
}

export default DialogSearch