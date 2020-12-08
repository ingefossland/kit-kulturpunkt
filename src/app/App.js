import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import "../styles/reset.css"
import "../styles/Akkurat.css"
import "../styles/AkkuratMono.css"
import "../styles/MaterialIcons.css"

import AppRoutes from "./AppRoutes"
import AppLoader from "./AppLoader"

const App = (props) => {

    return (
        <Router>
            <AppLoader {...props}>
                <AppRoutes {...props} />
            </AppLoader>)
        </Router>
    )

    return (
        <Router>
            <AppRoutes {...props} />
        </Router>
    )
}

export default App