import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';
import { Loader } from "@kit-ui/admin"

const CollectionLoader = ({siteName, collectionId, children, ...props}) => {
    // const { siteName, collectionId } = props.match.params

    const dispatch = useDispatch()

    useEffect(() => {
        collectionId && dispatch(getCollection({id: collectionId}))
    }, [siteName, collectionId])

    const collection = useSelector(state => state.collection)

    const isLoading = collection.isLoading
    const title = collectionId && "Loading collection " + collectionId || "Loading"

    return (
        <Loader
            isLoading={isLoading}
            title={title}>
                {collection.id && children}
        </Loader>
    )

}

CollectionLoader.defaultProps = {
}

export default CollectionLoader