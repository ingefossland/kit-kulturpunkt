import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';

import BulkLayout from "./BulkLayout"
import BulkEditor from "./BulkEditor"

const FinderBulk = ({children}) => {
    const bulk = useSelector(state => state.bulk)

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