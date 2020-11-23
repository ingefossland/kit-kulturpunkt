import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';
import { getFinder, getMenuItem, getParents } from '../redux/finder';

import FinderLoader from "./FinderLoader"
import FinderQuery from "./FinderQuery"
import FinderTree from "./FinderTree"
import FinderUpload from "./FinderUpload"

const templates = {
    "finder/query": FinderQuery,
    "finder/tree": FinderTree,
    "tree": FinderTree,
    "treeitem": FinderTree,
    "upload": FinderUpload
}

const Finder = (props) => {
    const pathname = props.location.pathname
    const finder = useSelector(state => state.finder)

    const menuByUrl = finder.menuByUrl
    const menuItem = pathname && menuByUrl && menuByUrl[pathname]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("finder"))
    }, [])

    const template = menuItem && menuItem.template || menuItem && menuItem.type

    const FinderTemplate = templates && templates[template] || FinderQuery

    return (
        <FinderLoader {...props}>
            <FinderTemplate menuItem={menuItem} {...props} />
        </FinderLoader>
    )

}

Finder.defaultProps = {
}

export default Finder