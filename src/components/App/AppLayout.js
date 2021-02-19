
import React from 'react';
import PropTypes from "prop-types"

import { AppBase, AppHeader, AppSidebar, AppContent, AppBody } from "./"

import NavAction from "../NavAction/NavAction"
import NavMenu from "../NavMenu/NavMenu"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    app: {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: "hidden",

        display: "flex",
        flexDirection: "column"

    },
    header: {
        position: "absolute",
        height: theme.spacing(8),
        overflow: "hidden",
        marginTop: theme.spacing(-8),
        transition: ".125s ease-out",

        "&[aria-expanded=true]":  {
            marginTop: 0,
            
            "& + *": {
                marginTop: theme.spacing(8),
            }
        },
    },
    body: {
        position: "relative",
        transition: ".125s ease-out",
        display: "flex",

        flexBasis: 0,
        flexGrow: 1

    },
    sidebar: {
        width: props => { return props.sidebar.width },
        marginLeft: props => { return props.sidebar.width * -1 },
        transition: ".125s ease-out",

        "&[aria-expanded=true]":  {
            [theme.breakpoints.up('sm')]: {
                marginLeft: 0,
            }
        },
        "&[aria-expanded=true] + *":  {
            [theme.breakpoints.up('sm')]: {
 //               marginLeft: props => { return props.sidebar.width },
            }
        },
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%"
    },
    navAction: {
        position: "relative",
        zIndex: 2,
        margin: theme.spacing(3)
    },

    navCalendar: {
        margin: theme.spacing(2,.5)
    },

    navMenu: {
//        margin: theme.spacing(2)
    },

}));

/** AppLayout is a wrapper for all apps using AppHeader */

const AppLayout = ({
    theme = undefined, 
    header = {}, 
    sidebar = {
        width: 224
    }, 
    search = undefined, 
    subview = undefined,
    primaryAction = undefined,
    icons = {},
    menu, 
    menuByUrl = {},
    currentUrl = undefined,
    onSelect,
    onToggle,
    children
}) => {

    sidebar = {
        ...sidebar,
        width: 256
    }

    header = {
        subview: subview,
        search: search,
        sidebar: sidebar,
        ...header
    }


    const classes = useStyles({header, sidebar})

    return (
        <AppBase theme={theme} className={classes.app}>
            <AppHeader {...header} icons={icons} className={classes.header} />
            <AppBody className={classes.body}>
                {children}
            </AppBody>
        </AppBase>
    )    
    return (
        <AppBase theme={theme} className={classes.app}>
            <AppHeader {...header} icons={icons} className={classes.header} />
            <AppBody className={classes.body}>
                <AppSidebar {...sidebar} className={classes.sidebar}>
                    { primaryAction && <NavAction className={classes.navAction} icons={icons} menu={[primaryAction]} menuByUrl={menuByUrl} onSelect={onSelect} />}
                    { menu && <NavMenu className={classes.navMenu} icons={icons} menu={menu} menuByUrl={menuByUrl} currentUrl={currentUrl} onSelect={onSelect} onToggle={onToggle} />}
                </AppSidebar>
                <AppContent className={classes.content}>
                    { children }
                </AppContent>
            </AppBody>
        </AppBase>
    )

}

AppLayout.defaultProps = {
    app: {

    },
    header: {
        expanded: true
    },
}

AppLayout.propTypes = {
    /** App properties */
    app: PropTypes.shape({
        uniqueId: PropTypes.string,
        title: PropTypes.string
    }),
    /** Header properties */
    header: PropTypes.shape({
        expanded: PropTypes.bool
    }),
    /** Search properties */
    search: PropTypes.shape({
        expanded: PropTypes.bool
    }),
    /** Subview properties */
    subview: PropTypes.shape({
        expanded: PropTypes.bool
    }),
}

export default AppLayout;