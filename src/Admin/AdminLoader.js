import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from "../components/"
import icons from "../app/icons/"

const AdminLoader = ({children, ...props}) => {
    const app = useSelector(state => state.app)
    const appIcon = app.icon && icons[app.icon]

    return (
        <Loader
            isLoading={app.isLoading}
            icon={appIcon}
            title={app.title || "App"}
            description={app.uniqueId && "App loaded ..."}>
                {children}
        </Loader>
    )

}

AdminLoader.defaultProps = {
}

export default AdminLoader