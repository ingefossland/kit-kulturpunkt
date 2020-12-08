import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { SchemaBase } from '@kit-ui/schema';
import { bulkChange, bulkSubmit } from '../redux/bulk';

import registry from "../components/registry"
import schemasByName from "../schemas/schemasByName"

import BulkPreview from "./BulkPreview"

const uiSchema = {
    "ui:options": {
        "spacing": 2
    }

}

const BulkEditor = ({schema = {}, formData = {}, ...props}) => {

    const renderDebug = () => {

        return (
            <div style={{position: "absolute", bottom: "100px", left: 0, right: 0}}>
                <hr />
                {JSON.stringify(schema)}
                <hr />
                {JSON.stringify(formData)}
            </div>
        )

    }

    const dispatch = useDispatch()

    const _onChange = ({formData}) => {
        dispatch(bulkChange({formData}))
    }

    const _onSubmit = ({formData}) => {
        dispatch(bulkSubmit({formData}))
    }

    const formContext = {}

    return (
        <div>

            { renderDebug() }

            <BulkPreview />

        <SchemaBase {...registry} 
            noValidate={true}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            formContext={formContext}
            onChange={_onChange}
            onSubmit={_onSubmit} />
        </div>
    )
    
}

export default BulkEditor