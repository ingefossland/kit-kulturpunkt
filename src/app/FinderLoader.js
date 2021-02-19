import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { expandHeader } from '../redux/app';
import { getParents } from '../redux/finder';
import { Loader } from "../components/Loader"
import icons from "../icons"

const FinderLoader = ({children}) => {

    const location = useLocation()
    const pathname = location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const { isLoading, menuByUrl } = finder

    const parent = menuByUrl[pathname] || finder.parent
    const appIcon = icons[app.icon]

    const title = parent && parent.title || app && app.title
    const description = finder.isLoading && "Loading finder ..." || "Finder loaded"

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(expandHeader())
        dispatch(getParents({url: pathname}))
    }, [pathname, finder.isLoading, parent])


    if (parent) {
        return children
    }

    return <p>Loading</p>


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