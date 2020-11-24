import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//import NavSettings from "../NavSettings/NavSettings"
//import NavToolbar from "../NavToolbar/NavToolbar"
import NavTabs from "../NavTabs/NavTabs"
import ModuleTitle from './ModuleTitle';

import NavSettings from "../NavSettings/NavSettings"
//import NavToolbar from "../NavToolbar/NavToolbar"

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        zIndex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        height: theme.spacing(6),
        color: "inherit",

        "& + *": {
            zIndex: 1,
            marginTop: theme.spacing(6)
        },

    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "inherit",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "bold",
    },
    tabs: {
        flexGrow: 1,
        marginLeft: theme.spacing(1),
        color: "inherit"
    },
    settings: {
        zIndex: 3,
        display: "flex",
        flexWrap: "none",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        }
    },
    toolbar: {
        display: "flex",
        color: "inherit"
    },
}));

/** Used in ExpandedModule, will show a title, menu or list children */

const ModuleHeader = ({className, status, title, menu, settings, toolbar, children}) => {
    const classes = useStyles()

    if (children) {
        return (
            <header className={classes.header}>
                {children}
            </header>
        )
    }

    return (
        <header className={className || classes.header}>
            { menu && <NavTabs className={classes.tabs} tabs={menu} />}
            { !menu && <ModuleTitle className={classes.title} status={status} title={title} /> }
            { settings && <NavSettings className={classes.settings} settings={settings} /> }
        </header>
    )
    
}

export default ModuleHeader;
