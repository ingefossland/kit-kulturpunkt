
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { NavPath } from "@kit-ui/admin"
import { NavView } from "../components"

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
        padding: theme.spacing(0,1),
        "& + *": {
            marginTop: theme.spacing(8),
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: theme.spacing(2),
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
        flexBasis: 0,
        flexGrow: 1,
        margin: theme.spacing(0,1),
    },
    view: {
        margin: theme.spacing(1)
    }
}));

const FinderLayout = ({
    parents,
    onSelect,
    viewOptions,
    view,
    onView,
    children,
    ...props
}) => {

    const classes = useStyles()

    return (
        <div className={classes.finder}>
            <header className={classes.header}>
                { parents && <NavPath className={classes.path} parents={parents} onSelect={onSelect} /> }
                { viewOptions && <NavView className={classes.view} options={viewOptions} value={view} onChange={onView} /> }
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