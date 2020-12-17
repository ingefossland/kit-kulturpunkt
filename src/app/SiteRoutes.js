import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Switch, Route } from "react-router-dom";

const SiteRoutes = (props) => {

    const site = useSelector(state => state.site)

    const siteCollections = site && site.collections

    return (
        <div>
            {siteCollections && siteCollections.map((collection, index) => {
                return (
                    <div>
                        {JSON.stringify(collection)}
                    </div>
                )
            })}
        </div>
    )

    return (
        <p>{JSON.stringify(site)}</p>
    )

}

export default SiteRoutes