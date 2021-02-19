import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';
import { Loader } from "../components/Loader"
import icons from "../icons/"

const AppLoader = ({icon, siteName, collectionId, children, ...props}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        collectionId && dispatch(getCollection({id: collectionId}))
    }, [siteName, collectionId])

    const collection = useSelector(state => state.collection)

    const isLoading = collection.isLoading
    const title = collectionId && "Loading collection " + collectionId || "Loading"

    return (
        <Loader
            icon={icons[icon]}
            isLoading={isLoading}
            title={title}>
                {collection.id && children}
        </Loader>
    )

}

AppLoader.defaultProps = {
}

export default AppLoader