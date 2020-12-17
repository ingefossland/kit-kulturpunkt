import React from "react";
import SiteLoader from "./SiteLoader"
import SiteRoutes from "./SiteRoutes"

const Site = (props) => {

    return (
        <SiteLoader {...props}>
            <SiteRoutes {...props} />
        </SiteLoader>
    )

}

export default Site