import React from "react";
import { Switch, Route } from "react-router-dom";

import KpApp from "./KpApp"
import KioskApp from "./KioskApp"
import AdminApp from "./AdminApp"

import CollectionSwitcher from "./CollectionSwitcher"

const AppRoutes = (props) => {

    return (
        <Switch>
            <Route path="/admin" component={AdminApp} />
            <Route path="/:siteName/kiosk" component={KioskApp} />
            <Route path="/:siteName/kp" component={KpApp} />
            <Route path="/" component={CollectionSwitcher} />
        </Switch>
    )

}

export default AppRoutes