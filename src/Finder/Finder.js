import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLayout } from '../redux/app';
import { getFinder, getMenuItem, getParents } from '../redux/finder';

import FinderLoader from "./FinderLoader"
import FinderQuery from "./FinderQuery"
import FinderUpload from "./FinderUpload"

import DocumentTree from "./DocumentTree"

const templates = {
    "finder/query": FinderQuery,
    "finder/tree": DocumentTree,
    "tree": DocumentTree,
    "treeitem": DocumentTree,
    "upload": FinderUpload,
}

const Finder = (props) => {
    const pathname = props.location.pathname
    const finder = useSelector(state => state.finder)

    const parent = finder.parent

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLayout("finder"))
    }, [])

    const template = parent && parent.template
    const FinderTemplate = templates && templates[template] || FinderQuery

    return (
        <FinderLoader {...props}>
            <FinderTemplate 
                url={parent && parent.url}
                query={parent && parent.query}
                views={parent && parent.views}
                {...props} />
        </FinderLoader>
    )

}

Finder.defaultProps = {
}

export default Finder