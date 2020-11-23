import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from "../redux/app"
import Admin from "../Admin"
import app from "./kiosk/app"

const Kiosk = ({children, ...props}) => {
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp(app))
    }, [])

    return (
        <Admin {...props} />
    )

}

Kiosk.defaultProps = {
}

export default Kiosk