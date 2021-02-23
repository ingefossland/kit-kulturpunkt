import React, { useEffect } from "react"

import "../styles/reset.css"
import "../styles/Akkurat.css"
import "../styles/AkkuratMono.css"
import "../styles/MaterialIcons.css"

import {
    BrowserRouter as Router,
} from "react-router-dom";

import AppRoutes from "./AppRoutes"

import ReactGA from 'react-ga';
ReactGA.initialize('G-G4DC78EBMS');
ReactGA.pageview(window.location.pathname + window.location.search);


const App = (props) => {

    return (
        <Router basename="/">
            <AppRoutes {...props} />
        </Router>
    )

}

export default App