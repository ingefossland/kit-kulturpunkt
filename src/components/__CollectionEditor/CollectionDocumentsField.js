import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const CollectionSiteIdField = (props) => {
    const { formData, formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const pathname = useSelector(state => state.editor.pathname)

    const query = {
        url: pathname + "/siteId",
        models: "sites",
        fl: "id,parentId,uniqueId,title",
        ...uiQuery
    }

    const dispatch = useDispatch()

    useEffect(() => {
        pathname && dispatch(getQuery(query))
    }, [pathname])

    const [enumOptions, setEnumOptions] = useState([formData])
    const [enumNames, setEnumNames] = useState([formData])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]

    const getOptions = () => {
        const resultsLoaded = currentSearch && currentSearch.resultsLoaded || []

        let optionsEnum = [
            null
        ], optionsNames = [
            "No siteId"
        ]

        resultsLoaded && resultsLoaded.map(model => {
            const label = model.title + " ("+model.id+")"
            optionsEnum.push(model.id)
            optionsNames.push(label)
        })

        setEnumOptions(optionsEnum)
        setEnumNames(optionsNames)
    }

    useEffect(() => {
        getOptions()
    }, [currentSearch])

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