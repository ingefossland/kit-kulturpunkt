import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';
import { getSite } from '../redux/site';
import { Loader } from "@kit-ui/admin"
import qs from 'query-string';

const AppLoader = ({children, ...props}) => {

    const dispatch = useDispatch()
    const collection = useSelector(state => state.collection)
    const site = useSelector(state => state.site)

    const sq = window.location.search && qs.parse(window.location.search) || {}

    const collectionId = sq.collectionId || 54

    useEffect(() => {
        dispatch(getCollection({id: collectionId}))
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