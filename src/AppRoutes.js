import React from "react";
import { Switch, Route } from "react-router-dom";

import Admin from "./Admin"

const AppRoutes = (props) => {

    return (
        <Switch>
            <Route path="/" component={Admin} />
        </Switch>
    )
}

export default AppRoutes