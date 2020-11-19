import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppLoader } from "@kit-ui/admin"
import { EditorIcon } from "@kit-ui/icons"

const AdminLoader = ({children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    const loadingTitle = menuItem && menuItem.title || app && app.title
    const loadingDescription = menuItem && menuItem.url || app.isLoading && "Loading app" || finder.isLoading && "Loading finder"

    const isLoading = app.isLoading || finder.isLoading || menuItem && menuItem.isLoading || false

    return (
        <AppLoader
            isLoading={isLoading}
            icon={<EditorIcon />}
            title={loadingTitle}
            description={loadingDescription}>
                {children}
        </AppLoader>
    )

}

AdminLoader.defaultProps = {
}

export default AdminLoader