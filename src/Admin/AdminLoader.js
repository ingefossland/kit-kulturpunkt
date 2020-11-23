import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenu } from '../redux/finder';
import { Loader } from "../components/"

const AdminLoader = ({children, ...props}) => {
    const app = useSelector(state => state.app)

    /*
    const menu = app.menu

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMenu(app))
    }, [menu])
    */

    return (
        <Loader
            isLoading={app.isLoading}
            icon={app.icon}
            title={app.title || "App"}
            description={app.uniqueId && "App loaded ..."}>
                {children}
        </Loader>
    )

}

AdminLoader.defaultProps = {
}

export default AdminLoader