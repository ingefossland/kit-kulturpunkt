import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import DialogTabs from "./DialogTabs"

import { NavSettings } from "@kit-ui/admin"

const useStyles = makeStyles(theme => ({
    header: {
        position: "sticky",
        zIndex: 2,
        top: 0,
        padding: 0,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
//        minHeight: theme.spacing(4.5),
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
    },
    tabs: {

    },
    settings: {
        position: "absolute",
        top: 0,
        right: 0,
        margin: theme.spacing(.75,.5)

    }
}))

const DialogHeader = ({tabs, tabIndex, settings}) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            { tabs && <DialogTabs className={classes.tabs} tabs={tabs} tabIndex={tabIndex} /> }
            { settings && <NavSettings className={classes.settings} settings={settings} /> }
        </header>
    )
}


export default DialogHeader;