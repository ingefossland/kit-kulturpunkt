import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from "../redux/app"
import Admin from "../Admin"
import app from "./kp"

const Kulturpunkt = ({children, ...props}) => {
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp(app))
    }, [])

    return (
        <Admin {...props} />
    )

}

Kulturpunkt.defaultProps = {
}

export default Kulturpunkt