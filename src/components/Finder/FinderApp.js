import React from 'react';
import AppLayout from "../App/AppLayout"
import FinderLayout from "../Finder/FinderLayout"

const FinderApp = ({app, primaryAction, menu = [], menuByUrl = {}, calendar = {}, children}) => {

    const sidebar = {
        expanded: true,
        primaryAction: primaryAction,
        calendar: calendar,
        menu: menu,
        menuByUrl: menuByUrl
    }

    return (
        <AppLayout app={app} sidebar={sidebar} >
            <FinderLayout>
                {children}
            </FinderLayout>
        </AppLayout>
    )

}

export default FinderApp;
