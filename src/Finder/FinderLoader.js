import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParents } from '../redux/finder';
import { Loader } from "@kit-ui/admin"
import icons from "../icons"

const FinderLoader = ({children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const parent = finder.parent

    const appIcon = icons[app.icon]

    const title = parent && parent.title || app && app.title
    const description = finder.isLoading && "Loading finder ..." || "Finder loaded"

    const isLoading = !pathname || finder.isLoading || false

    const dispatch = useDispatch()

    useEffect(() => {
        pathname && dispatch(getParents({url: pathname}))
    }, [pathname, finder.isLoading])

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