import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';

import FinderLayout from "./FinderLayout"
import BulkLayout from "./BulkLayout"
import BulkEditor from "./BulkEditor"

const Finder = ({children, ...props}) => {

    const finder = useSelector(state => state.finder)
    const bulk = useSelector(state => state.bulk)

    return (
        <React.Fragment>
            <BulkLayout {...bulk} expanded={bulk.count && true}>
                <BulkEditor {...bulk} /> 
            </BulkLayout>
            <FinderLayout
                parents={finder && finder.parents}>
                    {children}
            </FinderLayout>
        </React.Fragment>
    )

}

export default Finder