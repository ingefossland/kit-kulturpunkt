import React, { useEffect, useState } from "react"
import { AppLayout} from "@kit-ui/admin"
import { useSelector, useDispatch } from 'react-redux';
import { getApp, getAppLayout, toggleSearch, getParents } from '../redux/app';
import _ from "lodash"
import qs from 'query-string';

import appData from "./app"
import AdminRoutes from "./AdminRoutes"

const Admin = (props) => {
    const { pathname } = props.location
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApp(appData))
    }, [])

    const app = useSelector(state => state.app)
    const menuByUrl = app && app.menuByUrl


    useEffect(() => {
        menuByUrl && dispatch(getParents({menuByUrl, pathname: pathname}))
    }, [menuByUrl, pathname])

    // date + view

    let date = sq.date
    let view = sq.view

    if (!view) {
        view = "week"
    }

    // select menu or calendar

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
        <AppLayout
            app={app}
            theme={app && app.theme}
            header={app && app.header}

            search={search}

            sidebar={app && app.sidebar}

            primaryAction={app.primaryAction}

            menu={app && app.menu}
            menuByUrl={app && app.menuByUrl}
            currentUrl={pathname}
            
            parents={app && app.parents}

            onSelect={_onSelect}
            >
                <AdminRoutes {...props} />
        </AppLayout>
    )
}

export default Admin