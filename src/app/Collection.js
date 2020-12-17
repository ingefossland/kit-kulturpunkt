import React from "react";
import CollectionLoader from "./CollectionLoader"
import CollectionRoutes from "./CollectionRoutes"

const Collection = (props) => {

    return (
        <CollectionLoader {...props}>
            <CollectionRoutes {...props} />
        </CollectionLoader>
    )

}

export default Collection