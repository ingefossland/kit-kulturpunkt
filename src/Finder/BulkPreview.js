import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { SchemaBase } from '@kit-ui/schema';
import { bulkChange, bulkSubmit } from '../redux/bulk';


const BulkPreview = ({schema = {}, formData = {}, ...props}) => {

    const dispatch = useDispatch()
    const bulk = useSelector(state => state.bulk)

    const bulkCount = bulk.count


    return (
        <div>
            Selected: {bulkCount}
        </div>
    )
    
}

export default BulkPreview