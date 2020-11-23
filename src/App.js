import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import "./css/reset.css"
import "./css/Akkurat.css"
import "./css/AkkuratMono.css"
import "./css/MaterialIcons.css"

import { useSelector, useDispatch } from 'react-redux';
import { getApp } from './redux/app';

import appData from "./Admin/app"
import AppRoutes from "./AppRoutes"

const App = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp(appData))
    }, [])

    const app = useSelector(state => state.app)

    return (
        <Router>
            <AppRoutes {...props} />
        </Router>
    )
}

export default App