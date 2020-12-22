import React, { useState } from 'react';
import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar';
import AppSearch from "./AppSearch"
import AppIdentifier from "./AppIdentifier"
import AppSubview from "./AppSubview"

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        position: "relative",
        width: "100%",
        height: theme.spacing(8),
        overflow: "hidden",
    },
    section: {
        position: "relative",
        width: "100%",

        height: theme.spacing(8),
        marginTop: theme.spacing(-8),
        transition: ".125s ease-out",

        "&[aria-expanded=true]": {
            marginTop: 0
        },

        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

    },
    button: {
        margin: theme.spacing(1),
        color: "inherit"
    },
    identifier: {
        position: "absolute",
        top: 0,
        rigth: 0,
        bottom: 0,
        left: 0,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: theme.spacing(8),
        pointerEvents: "none"
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
    growingSearch: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: "auto",
        height: theme.spacing(8),
        display: "flex",

        width: "auto",
        transition: ".125s ease-out",

        "&[aria-expanded=true]": {
            width: "100%",
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


const AppHeader = ({className, expanded = true, elevation = 2, color = "primary", title, subtitle, sidebar, search, subview, children }) => {

    const classes = useStyles({color, search})

    const ButtonSidebar = ({onClick}) => {
        return (
            <IconButton className={classes.button} onClick={onClick}>
                <MenuIcon />
            </IconButton>
        )

    }

    const ButtonSearch = ({onClick}) => {
        return (
            <IconButton className={classes.button} onClick={onClick}>
                <SearchIcon />
            </IconButton>
        )
    }

    const collapsibleSidebar = sidebar && sidebar.collapsible
    const growingSearch = search && search.variant === "growing"

    return (
        <AppBar position="absolute" className={className || classes.header} component="header" aria-expanded={expanded} elevation={expanded && elevation}>
            { subview && <AppSubview {...subview} className={classes.subview} expanded={subview && subview.expanded} /> }
            <section className={classes.section} aria-expanded={search && search.expanded && false || true}>
                { collapsibleSidebar && <ButtonSidebar onClick={sidebar && sidebar.onToggle} /> }
                <AppIdentifier className={classes.identifier} title={title} subtitle={subtitle} />
                { search && !growingSearch && <ButtonSearch onClick={search && search.onToggle} /> }
            </section>
            { search && <AppSearch {...search} className={growingSearch && classes.growingSearch || classes.search} /> }
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
    sidebar: PropTypes.shape({
        expanded: PropTypes.bool,
        onToggle: PropTypes.func
    }),
    search: PropTypes.shape({
        expanded: PropTypes.bool,
        placeholder: PropTypes.string,
        onToggle: PropTypes.func
    }),
    subview: PropTypes.shape({
        expanded: PropTypes.bool,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        onToggle: PropTypes.func
    })
}

export default AppHeader;