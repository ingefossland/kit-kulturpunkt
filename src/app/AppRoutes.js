import React from "react";
import { Switch, Route } from "react-router-dom";

import KioskApp from "./KioskApp"
import KpApp from "./KpApp"

const AppRoutes = () => {

    return (
        <Switch>
            <Route path="/kiosk" component={ KioskApp } />
            <Route path="/kp" component={ KpApp } />
            <Route path="/" component={ KpApp } />
        </Switch>
      )

}

export default AppRoutes