import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFinder } from '../redux/finder';
import { Loader } from "../components/"
import { EditorIcon } from "@kit-ui/icons"
import icons from "../app/icons"

const FinderLoader = ({children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    const appIcon = icons[app.icon]

    const menuByUrl = finder.menuByUrl
    const menuItem = pathname && menuByUrl && menuByUrl[pathname] || { isLoading: true }

    const title = menuItem && menuItem.title || app && app.title
    const description = menuItem.isLoading && "Loading menuItem ..." || finder.isLoading && "Loading finder ..." || "Finder loaded"

    const isLoading = app.isLoading || finder.isLoading || menuItem.isLoading || false

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFinder({pathname}))
    }, [pathname, menuItem.isLoading])

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