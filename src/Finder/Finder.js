import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLayout } from '../redux/app';
import { getFinder, getMenuItem, getParents } from '../redux/finder';

import FinderLoader from "./FinderLoader"
import FinderQuery from "./FinderQuery"
import FinderUpload from "./FinderUpload"

import DocumentTree from "./DocumentTree"

import CollectionSwitcher from "./CollectionSwitcher"



const templates = {
    "finder/query": FinderQuery,
    "finder/tree": DocumentTree,
    "tree": DocumentTree,
    "treeitem": DocumentTree,
    "upload": FinderUpload,
    "collections": CollectionSwitcher
}

const Finder = (props) => {
    const pathname = props.location.pathname
    const finder = useSelector(state => state.finder)

    const menuByUrl = finder.menuByUrl
    const menuItem = pathname && menuByUrl && menuByUrl[pathname]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLayout("finder"))
    }, [])

    const template = menuItem && menuItem.template
    const FinderTemplate = templates && templates[template] || FinderQuery

    return (
        <FinderLoader {...props}>
            <FinderTemplate 
                query={menuItem && menuItem.query}
                views={menuItem && menuItem.views}
                {...props} />
        </FinderLoader>
    )

}

Finder.defaultProps = {
}

export default Finder