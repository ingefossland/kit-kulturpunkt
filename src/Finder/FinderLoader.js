import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFinder } from '../redux/finder';
import { Loader } from "@kit-ui/admin"
import icons from "../icons"

const FinderLoader = ({children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    const appIcon = icons[app.icon]

    const menuByUrl = finder.menuByUrl
    const menuItem = pathname && menuByUrl && menuByUrl[pathname] || { url: pathname }
    const url = menuItem && menuItem.url 

    const title = menuItem && menuItem.title || app && app.title
    const description = finder.isLoading && "Loading finder ..." || "Finder loaded"

    const isLoading = !url || app.isLoading || finder.isLoading || false

    const dispatch = useDispatch()

    useEffect(() => {
        url && dispatch(getFinder(menuItem))
    }, [url])

    return (
        <Loader
            isLoading={isLoading}
            icon={appIcon}
            title={title}
            description={description}>
                {children}
        </Loader>
    )

}

FinderLoader.defaultProps = {
}

export default FinderLoader