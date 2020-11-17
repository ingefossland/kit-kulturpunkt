import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout, getParents } from '../redux/app';

import FinderLayout from "./FinderLayout"
import FinderQuery from "./FinderQuery"

import BulkLayout from "./BulkLayout"
import BulkEditor from "./BulkEditor"
//import FinderQuery from "./FinderQuery"

import qs from 'query-string';


const Finder = ({children, ...props}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("finder"))
    }, [])

    const app = useSelector(state => state.app)
    const bulk = useSelector(state => state.bulk)

    const { pathname } = props.location

    useEffect(() => {
        dispatch(getParents({pathname}))
    }, [pathname])

    return (
        <React.Fragment>
            <BulkLayout {...bulk} expanded={bulk.count && true}>
                <BulkEditor {...bulk} /> 
            </BulkLayout>
            <FinderLayout
                parents={app && app.parents}>
                    {children}
            </FinderLayout>
        </React.Fragment>
    )

}

export default Finder