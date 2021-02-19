import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSite } from '../redux/site';
import { Loader } from "@kit-ui/admin"

const SiteLoader = ({siteName, children, ...props}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        siteName && dispatch(getSite({name: siteName}))
    }, [siteName])

    const site = useSelector(state => state.site)

    const isLoading = site.isLoading
    const title = site.isLoading && "Loading site" || "Loading"

    return (
        <Loader
            isLoading={isLoading}
            title={title}>
                {site.id && children}
        </Loader>
    )

}

SiteLoader.defaultProps = {
}

export default SiteLoader