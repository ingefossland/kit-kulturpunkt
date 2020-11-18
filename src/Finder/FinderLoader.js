import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';
import { getMenuItem, getParents } from '../redux/finder';

import { AppLoader } from "@kit-ui/admin"
import { EditorIcon } from "@kit-ui/icons"

import Finder from "./Finder"
import FinderQuery from "./FinderQuery"
import FinderTree from "./FinderTree"
import FinderUpload from "./FinderUpload"

const templates = {
    "finder/query": FinderQuery,
    "finder/tree": FinderTree,
    "tree": FinderTree,
    "treeitem": FinderTree,
    "upload": FinderUpload
}

const FinderLoader = (props) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    const menuByUrl = finder.menuByUrl
    const menuItem = pathname && menuByUrl && menuByUrl[pathname] || {}

    const title = menuItem.title || app && app.title || "Finder"
    const description = app.isLoading && "Loading app" || finder.isLoading && "Loading finder" || menuItem.isLoading && "Loading menuItem" || "Finder loaded"

    const isLoading = app.isLoading || finder.isLoading || menuItem.isLoading || false

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("finder"))
    }, [isLoading])

    useEffect(() => {
        dispatch(getMenuItem({
            ...menuItem,
            url: pathname
        }))
    }, [pathname, menuItem.query])


    useEffect(() => {
        dispatch(getParents({url: pathname}))
    }, [menuItem.isLoading])


    const { type, template } = menuItem

    const FinderTemplate = templates && templates[template] || templates && templates[type] || FinderQuery

    return (
        <AppLoader
            isLoading={isLoading}
            icon={<EditorIcon />}
            title={title}
            description={description}>
                <Finder {...props}>
                    <FinderTemplate menuItem={menuItem} {...props} />
                </Finder>
        </AppLoader>
    )

}

FinderLoader.defaultProps = {
}

export default FinderLoader