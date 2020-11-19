import React, { useEffect, useState } from "react"
import { AppLayout} from "@kit-ui/admin"
import { useSelector, useDispatch } from 'react-redux';
import { getApp, getAppLayout, toggleSearch, toggleSidebar } from '../redux/app';
import { getFinder, getParents, toggleMenuItem, getMenuItem } from '../redux/finder';

import _ from "lodash"
import qs from 'query-string';

import appData from "./app"
import AdminRoutes from "./AdminRoutes"
import AdminLayout from "./AdminLayout"
import AdminLoader from "./AdminLoader"

const Admin = (props) => {
    const { pathname } = props.location
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp({...appData, pathname: pathname}))
    }, [])

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // date + view

    let date = sq.date
    let view = sq.view

    if (!view) {
        view = "week"
    }

    // select menu or calendar

    const _onToggle = ({sidebar, search, url}) => {

        sidebar && dispatch(toggleSidebar())
        search && dispatch(toggleSearch())
        
        url && dispatch(toggleMenuItem({url}))

    }

    const _onSelect = ({url, date}) => {

        if (!url && date) {
            sq.date = date
            props.history.replace(pathname + "?" + qs.stringify(sq))
        }

        url && props.history.push(url)
    }

    // search

    const [q, setQ] = useState(sq && sq.q)

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

    const _onSearchQuery = _.debounce((q, event) => {
        setQ(q)
    }, 500)

    const _onSearchReset = () => {
        if (q) {
            setQ('')
        } else {
            dispatch(toggleSearch())
        }
    }

    // search

    const search = {
        ...app.search,
//        expanded: q && q.length && true,
        q: q,
        onChange: (q, event) => _onSearchQuery(q),
        onReset: (q, event) => _onSearchReset(),
        onToggle: () => dispatch(toggleSearch())
    }

    return (
        <AdminLoader {...props}>
            <AdminLayout
                app={app}
                theme={app && app.theme}
                header={app && app.header}

                search={search}

                sidebar={app && app.sidebar}

                primaryAction={app.primaryAction}

                menu={app && app.menu}
                menuByUrl={finder && finder.menuByUrl}
                currentUrl={pathname}
                
                parents={finder && finder.parents}

                onSelect={_onSelect}
                onToggle={_onToggle}
                >
                    <AdminRoutes {...props} />
            </AdminLayout>
        </AdminLoader>
    )
}

export default Admin