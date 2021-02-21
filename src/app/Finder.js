import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";

import { toggleDarkMode } from "../redux/app"

import { FinderBase, FinderSidebar, FinderSection } from "../components/Finder"
import { AppInfo } from "../components/App"
import { NavMenu } from "../components/NavMenu"
import { NavAction } from "../components/NavAction"

import FinderQuery from "./FinderQuery"

import BulkPreview from "./BulkPreview"
import BulkEditor from "./BulkEditor"
import FinderLoader from "./FinderLoader"

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

const Finder = () => {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // primaryAction

    const primaryAction = finder.primaryAction

    // dark mixBlendMode: 
    
    const _onToggleDarkMode = () => {
        dispatch(toggleDarkMode())
    }


    // menu

    const menu = finder.menu
    const menuByUrl = finder.menuByUrl

    const _onSelect = ({url}) => {
        history.push(url)
    }

    // parent && query

    const pathname = location.pathname
    const parent = menuByUrl && menuByUrl[pathname] || {}

    // bulk

    const bulk = useSelector(state => state.bulk)
    const bulkCount = bulk.count

    // preview

    const preview = {
        expanded: bulkCount && true,
    }

    // editor

    const editor = {
        ...finder.editor,
    }

    // view

    const view = {
        expanded: !editor.expanded
    }

    // sidebar

    let sidebar = finder.sidebar

    if (preview.expanded || editor.expanded) {
        sidebar = {
            expanded: false
        }
    }

    const classes = useStyles()

    return (
        <FinderLoader>
            <FinderBase>
                <FinderSidebar {...sidebar}>
                    <AppInfo {...app} className={classes.info} icons={icons} onClick={_onToggleDarkMode} />
                    <NavAction className={classes.action} menu={[primaryAction]} menuByUrl={menuByUrl} onSelect={_onSelect} />
                    <NavMenu className={classes.menu} icons={icons} currentUrl={pathname} menu={menu} menuByUrl={menuByUrl} onSelect={_onSelect} />
                </FinderSidebar>
               <FinderSection {...view}>
                    <FinderQuery {...parent} />
                </FinderSection>
                <FinderSection {...preview}>
                    <BulkPreview {...preview} />
                </FinderSection>
                <FinderSection {...editor}>
                    <BulkEditor {...editor} />
                </FinderSection>
            </FinderBase>
        </FinderLoader>
    )

}

export default Finder