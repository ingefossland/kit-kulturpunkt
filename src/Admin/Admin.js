import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getLayout, toggleSidebar } from '../redux/app';
import { toggleMenuItem } from '../redux/finder';

import _ from "lodash"
import qs from 'query-string';

import AdminRoutes from "./AdminRoutes"
import AdminLoader from "./AdminLoader"
import AdminSearch from "./AdminSearch"

//import { AppLayout } from "@kit-ui/admin"
import AppLayout from "../components/App/AppLayout"

import icons from "../icons"

const Admin = (props) => {
    const { pathname } = props.location
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // date + view

    let date = sq.date
    let view = sq.view

    if (!view) {
        view = "week"
    }

    // select menu or calendar

    const _onToggle = ({url}) => {
        url && dispatch(toggleMenuItem({url}))
    }

    const _onSelect = ({url, date}) => {

        console.log('onSelect', url)

        if (!url && date) {
            sq.date = date
            props.history.replace(pathname + "?" + qs.stringify(sq))
        }

        url && props.history.push(url)
    }



    // header

    const header = {
        ...app.header,
        title: app.title,
        subtitle: app.siteTitle
    }

    // sidebar

    const sidebar = {
        ...app.sidebar,
        collapsible: true,
        onToggle: () => dispatch(toggleSidebar())
    }

    // subview

    const subview = app.subview && {
        ...app.subview,
        onToggle: () => dispatch(getLayout('finder'))
    }

    return  (
        <AdminSearch {...props}>
            <AppLayout 
                theme={app.theme}
                icons={icons}

                header={header}
    //            search={search}
                sidebar={sidebar}
                subview={subview}

                primaryAction={finder.primaryAction}
                menu={finder && finder.menu}
                menuByUrl={finder && finder.menuByUrl}

                currentUrl={pathname}

                onSelect={_onSelect}
                onToggle={_onToggle}>
                <AdminRoutes {...props} />
            </AppLayout>
        </AdminSearch>
    )

    
}

export default Admin