import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import KpApp from "./KpApp"
import KioskApp from "./KioskApp"

const CollectionRoutes = (props) => {

    const site = useSelector(state => state.site)
    const collection = useSelector(state => state.collection)
    const { collectionType } = collection

    return (
        <div>
            {site.title} {site.name}
            <hr />
            {collection.title} {collection.collectionType}
        </div>
    )


}

export default CollectionRoutes