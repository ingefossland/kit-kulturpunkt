import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getLayout, toggleSearch, toggleSidebar } from '../redux/app';
import { toggleMenuItem } from '../redux/finder';

import _ from "lodash"
import qs from 'query-string';

import AdminRoutes from "./AdminRoutes"
// import AdminLayout from "./AdminLayout"
import AdminLoader from "./AdminLoader"

import { AppLayout } from "@kit-ui/admin"

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

    // search

    const [q, setQ] = useState("")

    useEffect(() => {
        if (q) {
            sq.q = q.replace(' ', '+')
        } else {
            delete sq.q
        }

        let query = qs.stringify(sq)

        const pathname = props.location.pathname + "?" + query;
        const hash = props.location.hash;

        const url = hash && pathname + hash || pathname
        
        if (props.history) {
            props.history.replace(url)
        }

    }, [q])

    const _onSearchQuery = _.debounce((q) => {
        setQ(q)
    }, 500)

    const _onSearchReset = () => {

        if (q) {
            setQ("")
            delete sq.q
        } else {
            dispatch(toggleSearch())
        }

    }

    // header

    const header = {
        ...app.header,
        title: app.title,
        subtitle: app.subtitle
    }

    // search

    const search = {
        ...app.search,
        onChange: (q, event) => { _onSearchQuery(q) },
        onReset: () => _onSearchReset(),
        onToggle: () => dispatch(toggleSearch())
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

    return (
        <AdminLoader {...props}>
            <AppLayout 
                theme={app.theme}
                icons={icons}

                header={header}
                search={search}
                sidebar={sidebar}
                subview={subview}

                primaryAction={app.primaryAction}

                menu={finder && finder.menu}
                menuByUrl={finder && finder.menuByUrl}

                currentUrl={pathname}

                onSelect={_onSelect}
                onToggle={_onToggle}
            >
                <AdminRoutes {...props} />
            </AppLayout>
        </AdminLoader>
    )

    
}

export default Admin