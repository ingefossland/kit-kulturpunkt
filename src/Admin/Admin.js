import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getLayout, toggleSearch, toggleSidebar } from '../redux/app';
import { toggleMenuItem } from '../redux/finder';

import _ from "lodash"
import qs from 'query-string';

import AdminRoutes from "./AdminRoutes"
import AdminLoader from "./AdminLoader"

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
    
    const _onSearchChange = _.debounce((q) => {
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
        subtitle: app.siteTitle
    }

    // autocomplete

    const [searchInput, setSearchInput] = useState("")

    const searchScopes = [
        {
            title: "Søk etter {q} i " + pathname,
            url: pathname
        },
        {
            title: "Søk etter {q} i hele KulturPunkt",
            url: "rootUrl"
        }
    ]

    const filterOptions = (options, params) => {

        const inputValue = params.inputValue

        let filteredOptions = []

        options.map(option => {
            const { title } = option;

            filteredOptions.push({
                ...option,
                title: title.replace("{q}", inputValue),
                q: inputValue
            })
        })

        return filteredOptions

    }

    const searchOptions = [
        ...searchScopes
    ]

    const [value, setValue] = useState("")

    const _onAutocompleteChange = (event, option, reason) => {
        setQ(option.q)
    }

    const _onAutocompleteInputChange = (event, option, reason) => {
        console.log("InputChange", value)
    }

    const autocompleteProps = {
        options: searchOptions,
        getOptionLabel: (option) => option.title,
        filterOptions: filterOptions,
        onChange: _onAutocompleteChange,
        onInputChange: _onAutocompleteInputChange
    }

    // search

    const search = {
        ...app.search,
        autocompleteProps: autocompleteProps,
        value: searchInput,
        onChange: _onSearchChange,
        onChange: (q, event) => { _onSearchChange(q) },
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

    return  (
        <AppLayout 
            theme={app.theme}
            icons={icons}

            header={header}
            search={search}
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
    )

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