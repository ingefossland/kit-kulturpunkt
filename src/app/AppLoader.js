import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from "@kit-ui/admin"
import icons from "../icons/"

const AppLoader = ({children, ...props}) => {

    const pathname = props.location.pathname
    const app = useSelector(state => state.app)

    const { root, icon, siteId, title, siteName, siteTitle, collectionType, collectionId } = app

    const isLoading = app.isLoading
    const loadingTitle = title && title || "Loading app ..."

    let description = "Loading " + root + "..."

    if (siteId) {
        description = "Site loaded: " + siteTitle
    }

    if (collectionId) {
        description = "Collection loaded: " + collectionId
    }

    const appIcon = icon && icons[icon]

    return (
        <Loader
            icon={appIcon}
            isLoading={isLoading}
            title={loadingTitle}
            description={description}>
                {collectionId && children}
        </Loader>
    )

}

AppLoader.defaultProps = {
}

export default AppLoader