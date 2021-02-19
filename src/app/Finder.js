import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

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
        minHeight: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 3),
        boxSizing: "border-box"
    }
}));

const PrimusFinder = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const modelsById = useSelector(state => state.modelsById)

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

    const pathname = props.location.pathname
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
        <FinderLoader {...props}>
            <FinderBase>
                <FinderSidebar {...sidebar}>
                    <NavAction className={classes.action} menu={[primaryAction]} menuByUrl={menuByUrl} onSelect={_onSelect} />
                    <NavMenu icons={icons} currentUrl={pathname} menu={menu} menuByUrl={menuByUrl} onSelect={_onSelect} />
                    <AppInfo {...app} icons={icons} onClick={_onToggleDarkMode} />
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

export default PrimusFinder