import React, { useState } from 'react';
import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar';
import AppSearch from "./AppSearch"
import AppIdentifier from "./AppIdentifier"
import AppSubview from "./AppSubview"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        position: "relative",
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",
    },
    identifer: {
        position: "relative",
        width: "100%",
        height: theme.spacing(8),
        marginTop: theme.spacing(-8),
        transition: ".125s ease-out",
        "&[aria-expanded=true]": {
            marginTop: 0
        }
    },
    subview: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        position: "relative",
        width: "100%",
        height: theme.spacing(8),
        marginTop: theme.spacing(-8),
        transition: ".125s ease-out",
        "&[aria-expanded=true]": {
            marginTop: 0
        }
    },
    search: {
        position: "relative",
        height: theme.spacing(8),
        transition: ".125s ease-out",

        display: "flex",
        position: "relative",
        backgroundColor: "white",
        color: theme.palette.text.primary,
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",
        fontFamily: "Akkurat, sans-serif",

        "&[aria-expanded=true]": {
            marginTop: theme.spacing(-8),
        }
    }
}));


const AppHeader = ({className, expanded = true, elevation = 2, color = "primary", title, subtitle, menu, search, subview, children }) => {

    const classes = useStyles({color, search})
//    const classesSearch = search && search.variant === "grow" && classes.growingSearch || classes.search
//    const justifyContent = search && search.variant === "grow" && "flex-start" || "center"


    
    return (
        <AppBar position="absolute" className={className || classes.header} component="header" aria-expanded={expanded} elevation={expanded && elevation}>
            { subview && <AppSubview {...subview} className={classes.subview} expanded={subview && subview.expanded} /> }
            <AppIdentifier className={classes.identifer} menu={menu} search={search} title={title} subtitle={subtitle} expanded={search && search.expanded && false || true} />
            { search && <AppSearch {...search} className={classes.search} /> }
            { children }
        </AppBar>
    )

}

AppHeader.defaultProps = {
    expanded: true,
    search: undefined,
    subview: undefined
}

AppHeader.propTypes = {
    expanded: PropTypes.bool,
    elevation: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    search: PropTypes.shape({
        expanded: PropTypes.bool,
        placeholder: PropTypes.string
    }),
    subview: PropTypes.shape({
        expanded: PropTypes.bool,
        title: PropTypes.string,
        subtitle: PropTypes.string
    })
}

export default AppHeader;