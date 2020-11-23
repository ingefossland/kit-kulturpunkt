import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp, getAppLayout, toggleSearch, toggleSidebar } from '../redux/app';
import { Loader } from "../components/"
import { EditorIcon } from "@kit-ui/icons"

import app from "./app"


const AdminLoader = ({children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp({...app, pathname: pathname}))
    }, [])

    /*

    const finder = useSelector(state => state.finder)

    const menuByUrl = finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]


    const loadingTitle = menuItem && menuItem.title || app && app.title
    const loadingDescription = menuItem && menuItem.url || app.isLoading && "Loading app" || finder.isLoading && "Loading finder"

    const isLoading = app.isLoading || finder.isLoading || menuItem && menuItem.isLoading || false
    */


    return (
        <Loader
            isLoading={app.isLoading}
            icon={<EditorIcon />}
            title={app.title || "App"}
            description={app.uniqueId && "App loaded ..."}>
                {children}
        </Loader>
    )

}

AdminLoader.defaultProps = {
}

export default AdminLoader