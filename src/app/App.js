import React, { useEffect } from "react"

import "../styles/reset.css"
import "../styles/Akkurat.css"
import "../styles/AkkuratMono.css"
import "../styles/MaterialIcons.css"

import {
    BrowserRouter as Router,
} from "react-router-dom";

import AppRoutes from "./AppRoutes"

const App = (props) => {

    return (
        <Router basename="/">
            <AppRoutes {...props} />
        </Router>
    )

}

export default App