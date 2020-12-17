import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSiteApp } from "../redux/app"
import AppLoader from "./AppLoader"
import Admin from "../Admin"
import app from "./kiosk/app"

const KioskApp = ({children, ...props}) => {
    const { siteName } = props.match.params
  
    const dispatch = useDispatch()

    const collectionType = "kp"
    const root = "/" + siteName + "/kiosk"
    
    useEffect(() => {
        root && dispatch(getSiteApp({
            ...app,
            root: root,
            siteName: siteName,
            collectionType: collectionType,
        }))
    }, [root])

    return (
        <AppLoader {...props}>
            <Admin {...props} />
        </AppLoader>
    )


}

KioskApp.defaultProps = {
}

export default KioskApp