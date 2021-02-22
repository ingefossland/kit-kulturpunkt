import React, { useEffect } from "react"
import { FinderBase, FinderSidebar } from "../components/Finder"
import { AppInfo } from "../components/App"
import { NavMenu } from "../components/NavMenu"
import { NavAction } from "../components/NavAction"

import { makeStyles } from '@material-ui/core/styles';

import icons from "../icons/"

const useStyles = makeStyles(theme => ({
    action: {
        position: "absolute",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(1.5),
        margin: theme.spacing(1.5),
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.default,
    },
    menu: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll",
        paddingTop: 96,
        paddingBottom: 96,
    },
    info: {
        position: "absolute",
        zIndex: 2,
        top: "auto",
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(1.5),
        margin: theme.spacing(1.5),
        backgroundColor: theme.palette.background.default,       
    }
}));

const FinderLayout = ({
    sidebar: {},
    info: {},
    menu: [],
    menuByUrl: [],
    onSelect
}) => {

    const classes = useStyles()

    return (
        <FinderBase>
            <FinderSidebar {...sidebar}>
                <AppInfo {...info} className={classes.info} icons={icons}  />
                <NavAction className={classes.action} menu={[primaryAction]} menuByUrl={menuByUrl} onSelect={onSelect} />
                <NavMenu className={classes.menu} icons={icons} currentUrl={pathname} menu={menu} menuByUrl={menuByUrl} onSelect={onSelect} />
            </FinderSidebar>
            {children}
        </FinderBase>
    )

}

export default FinderLayout