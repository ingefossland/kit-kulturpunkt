import React from "react";
import { Switch, Route } from "react-router-dom";

import KulturPunkt from "./KpApp"
import Kiosk from "./KioskApp"

const AppRoutes = (props) => {

    return (
        <Switch>
            <Route path="/kiosk" component={Kiosk} />
            <Route path="/" component={KulturPunkt} />
        </Switch>
    )
}

export default AppRoutes