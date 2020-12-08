import React from "react";
import { Switch, Route } from "react-router-dom";

import KulturPunktApp from "./KpApp"
import KioskApp from "./KioskApp"
import AdminApp from "./AdminApp"


const AppRoutes = (props) => {

    return (
        <Switch>
            <Route path="/admin" component={AdminApp} />
            <Route path="/kiosk" component={KioskApp} />
            <Route path="/kp" component={KulturPunktApp} />
            <Route path="/" component={KulturPunktApp} />
        </Switch>
    )
}

export default AppRoutes