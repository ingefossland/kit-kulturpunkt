import React, { useState, useEffect } from 'react';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const CollectionSiteIdField = (props) => {
    const { formData, formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const [models, setModels] = useState([])

    const _getQuery = () => {

        const apiUrl = "https://kompass.dimu.org/admin/api/sites"

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(results => {
            results.models && setModels(results.models)
        })

    }

    useEffect(() => {
        _getQuery(uiQuery)
    }, [])

    const [enumOptions, setEnumOptions] = useState([formData])
    const [enumNames, setEnumNames] = useState([formData])

    const getOptions = () => {

        let optionsEnum = [
            null
        ], optionsNames = [
            "No siteId"
        ]

        models && models.map(model => {
            const label = model.title + " ("+model.id+")"
            optionsEnum.push(model.id)
            optionsNames.push(label)
        })

        setEnumOptions(optionsEnum)
        setEnumNames(optionsNames)
    }

    useEffect(() => {
        getOptions()
    }, [models])

    const { SchemaField } = props.registry.fields;

    const newSchema = {
        ...schema,
        enum: enumOptions,
        enumNames: enumNames,
        default: null
    }

    const newUiSchema = {
        ...uiSchema,
        "ui:field": undefined
    }

    return (
        <SchemaField {...props} schema={newSchema} uiSchema={newUiSchema} />
    )

}

export default CollectionSiteIdField