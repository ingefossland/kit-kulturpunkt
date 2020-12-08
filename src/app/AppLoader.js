import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';
import { getSite } from '../redux/site';
import { Loader } from "@kit-ui/admin"

const AppLoader = ({children, ...props}) => {

    const dispatch = useDispatch()
    const collection = useSelector(state => state.collection)
    const site = useSelector(state => state.site)

    useEffect(() => {
        dispatch(getCollection({id: 54}))
    }, [])

    useEffect(() => {
        collection.siteId && dispatch(getSite({id: collection.siteId}))
    }, [collection.siteId])


    const isLoading = collection.isLoading || site.isLoading
    const title = site.isLoading && "Loading site" || collection.isLoading && "Loading collection" || "Loading"


    return (
        <Loader
            isLoading={isLoading}
            title={title}>
                {collection.id && site.id && children}
        </Loader>
    )

}

AppLoader.defaultProps = {
}

export default AppLoader