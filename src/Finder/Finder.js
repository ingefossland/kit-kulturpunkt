import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getApp, getAppLayout, getParents } from '../redux/app';

import FinderLayout from "./FinderLayout"
import FinderQuery from "./FinderQuery"

import qs from 'query-string';


const Finder = ({query = {}, ...props}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("finder"))
    }, [])

    const app = useSelector(state => state.app)
    const menuByUrl = app && app.menuByUrl

    const { pathname } = props.location

    useEffect(() => {
        menuByUrl && dispatch(getParents({menuByUrl, pathname: pathname}))
    }, [menuByUrl, pathname])

    // set query

    const sq = props.location.search && qs.parse(props.location.search)

    query = {
        ...query,
        id: pathname,
        collectionId: app && app.collectionId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: "uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight",
        q: sq.q || undefined,
    };

    return (
        <FinderLayout
            parents={app && app.parents}>
            <FinderQuery {...props} query={query} />
        </FinderLayout>
    )
}

export default Finder