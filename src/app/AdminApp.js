import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from "../redux/app"
import Admin from "../Admin"
import app from "./admin/app"

const AdminApp = ({children, ...props}) => {
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp(app))
    }, [])

    return (
        <Admin {...props} />
    )

}

AdminApp.defaultProps = {
}

export default AdminApp