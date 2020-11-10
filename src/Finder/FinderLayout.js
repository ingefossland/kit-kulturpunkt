
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { NavPath, NavSettings } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    finder: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    header: {
        position: "relative",
        height: theme.spacing(8),
        display: "flex",
        alignItems: "center",
        zIndex: 1,
        "& + *": {
            marginTop: theme.spacing(8),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        }
    },
    body: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll"
    },  
    path: {
        margin: theme.spacing(0,2),
    },
    settings: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        margin: theme.spacing(1)
    }
}));

const FinderLayout = ({
    parents,
    settings,
    children,
    ...props
}) => {

    const classes = useStyles()

    return (
        <div className={classes.finder}>
            { settings && <NavSettings className={classes.settings} settings={settings} /> }
            <header className={classes.header}>
                { parents && <NavPath className={classes.path} parents={parents} /> }
            </header>
            <div className={classes.body}>
                {children}
            </div>
        </div>
    )

}

FinderLayout.defaultProps = {

}

FinderLayout.propTypes = {

}

export default FinderLayout;