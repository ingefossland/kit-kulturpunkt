import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from "../redux/app"
import Admin from "../Admin"
import app from "./kp"

const Kulturpunkt = ({children, ...props}) => {
  
    const dispatch = useDispatch()

    const collection = useSelector(state => state.collection)
    const site = useSelector(state => state.site)

    useEffect(() => {
        dispatch(getApp({
            ...app,
            subtitle: site.title,
            collectionId: collection.id,
            siteId: site.id
        }))
    }, [])

    return (
        <Admin {...props} />
    )

}

Kulturpunkt.defaultProps = {
}

export default Kulturpunkt