
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { NavPath, NavSettings } from "../components"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    bulk: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        transition: ".125s ease-out",
        marginLeft: "100%",

        "& + *": {
            transition: ".125s ease-out",
            marginRight: 0,
        },

        "&[aria-expanded=true]": {
            marginLeft: "50%",

            "& + *": {
                marginRight: "50%"
            }

        }

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

const BulkLayout = ({
    expanded = false,
    parents,
    settings,
    children,
    ...props
}) => {

    const classes = useStyles()

    return (
        <div className={classes.bulk} aria-expanded={expanded}>
            <header className={classes.header}>
                { parents && <NavPath className={classes.path} parents={parents} /> }
            </header>
            <div className={classes.body}>
                {children}
            </div>
        </div>
    )

}

BulkLayout.defaultProps = {

}

BulkLayout.propTypes = {

}

export default BulkLayout;