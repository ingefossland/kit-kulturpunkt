import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchById';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const ParentIdField = (props) => {
    const { formData, formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const collectionId = formContext && formContext.collectionId
    const uniqueId = formContext && formContext.uniqueId

    const query = {
        id: "/editor/" + uniqueId + "/parentId",
        models: "documents",
        collectionId: collectionId,
        fl: "id,parentId,uniqueId,title",
        q: "uniqueId:NOT " + uniqueId,
        ...uiQuery
    }

    const dispatch = useDispatch()

    useEffect(() => {
        uniqueId && dispatch(getQuery(query))
    }, [uniqueId])

    const [enumOptions, setEnumOptions] = useState([formData])
    const [enumNames, setEnumNames] = useState([formData])

    const searchById = useSelector(state => state.searchById)
    const currentSearch = searchById && searchById[query.id]

    const getOptions = () => {
        const resultsLoaded = currentSearch && currentSearch.resultsLoaded || []
        // const options = models.length && getOptionsTree(models) || []

        let optionsEnum = [
            undefined
        ], optionsNames = [
            "No parentId"
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
        enumNames: enumNames
    }

    const newUiSchema = {
        ...uiSchema,
        "ui:field": undefined
    }

    return (
        <SchemaField {...props} schema={newSchema} uiSchema={newUiSchema} />
    )

}

export default ParentIdField