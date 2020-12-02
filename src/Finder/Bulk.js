import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getSubview, getLayout } from '../redux/app';

import BulkLayout from "./BulkLayout"
import BulkEditor from "./BulkEditor"

const FinderBulk = ({children}) => {
    const dispatch = useDispatch()
    const bulk = useSelector(state => state.bulk)

    useEffect(() => {

        if (bulk.count) {
            dispatch(getLayout("finder/subview"))
        } else {
            dispatch(getLayout("finder"))
        }

        bulk.count && dispatch(getSubview({
            title: "Subview",
            description: bulk.count + " selected"
        }))

        
    }, [bulk.count])

    return (
        <React.Fragment>
            <BulkLayout {...bulk} expanded={bulk.count && true}>
                <BulkEditor {...bulk} /> 
            </BulkLayout>
            {children}
        </React.Fragment>
    )

}

export default FinderBulk