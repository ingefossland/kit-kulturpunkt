import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getApp } from "../redux/app"
import { collapseEditor, toggleSidebar } from "../redux/finder"
import { bulkReset } from '../redux/bulk';

import settings from "./settings/kp"

import { AppBase, AppHeader, AppBody } from "../components/App"

import AppLoader from "./AppLoader"
import AppSearch from "./AppSearch"
import AppRoutes from "./KpRoutes"

const KpApp = (props) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const { t, i18n } = useTranslation('finder');

    useEffect(() => {
        console.log('get app', settings)
        dispatch(getApp(settings))
    }, [])
    
    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    const header = {
        ...app.header,
        search: app.search,
        title: app.title,
        subtitle: app.subtitle
    }

    const bulk = useSelector(state => state.bulk)
    const bulkCount = bulk.count
    const bulkTitle = t('{{count}} selected', {count: bulkCount})

    const parents = [
        {
            url: app.root,
            title: app.title,
        },
        ...finder.parents
    ]

    const preview = {
//        ...finder.preview,
        expanded: bulkCount && true,
        parents: parents,
        title: bulkTitle,
        onToggle: () => dispatch(bulkReset()),
        onSelect: ({url}) => {
            url && history.push(url)
            dispatch(bulkReset())
        }
    }

    const editorParents = [
        ...preview.parents,
        {
            title: preview.title
        }
    ]

    const editor = {
        ...finder.editor,
        parents: editorParents,
        onToggle: () => dispatch(collapseEditor()),
        onSelect: ({url}) => {
            url && history.push(url)
            dispatch(collapseEditor())
        }
    }


    const subview = editor.expanded && editor || preview.expanded && preview || {}

    const sidebar = finder.sidebar && {
        ...finder.sidebar,
        collapsible: true,
        onToggle: () => dispatch(toggleSidebar())
    }


    return (
        <AppLoader {...app}>
            <AppBase {...app}>
                <AppSearch {...props}>
                    <AppHeader {...header} sidebar={sidebar} subview={subview} />
                </AppSearch>
                <AppBody>
                    <AppRoutes {...props} />
                </AppBody>
            </AppBase>
        </AppLoader>
    )

}

export default KpApp