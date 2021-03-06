import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from "@rjsf/core";
const { getUiOptions } = utils;

const ParentIdField = (props) => {
    const { formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)
    const { pathname, formData } = editor;

    const parentId = formData && formData.parentId
    const uniqueId = formData && formData.uniqueId
    const collectionId = formData && formData.collectionId

    const query = {
        url: pathname + "/parentId",
        models: "documents",
        collectionId: collectionId,
        fl: "id,parentId,uniqueId,title",
        q: "uniqueId:NOT " + uniqueId,
        ...uiQuery
    }

    const dispatch = useDispatch()

    useEffect(() => {
        collectionId && pathname && dispatch(getQuery(query))
    }, [pathname])

    const [enumOptions, setEnumOptions] = useState([formData])
    const [enumNames, setEnumNames] = useState([formData])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]

    const getOptions = () => {
        const resultsLoaded = currentSearch && currentSearch.resultsLoaded || []
        // const options = models.length && getOptionsTree(models) || []

        let optionsEnum = [
            null
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

export default ParentIdField