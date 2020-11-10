import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../../redux/searchById';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const ChildrenArrayField = (props) => {
    const { formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const collectionId = formContext && formContext.collectionId
    const uniqueId = formContext && formContext.uniqueId
    const id = formContext && formContext.id

    const query = {
        id: "/editor/" + uniqueId + "/children",
        models: "documents",
        collectionId: collectionId,
        parentId: id,
        fl: "uniqueId,title,description",
//        q: "parentId:NOT " + uniqueId,
        ...uiQuery
    }

    const dispatch = useDispatch()

    useEffect(() => {
        uniqueId && dispatch(getQuery(query))
    }, [uniqueId])

    const [enumOptions, setEnumOptions] = useState([])
    const [enumNames, setEnumNames] = useState([])

    const searchById = useSelector(state => state.searchById)
    const currentSearch = searchById && searchById[query.id]

    const formData = currentSearch && currentSearch.resultsLoaded || []

    useEffect(() => {
        props.onChange && props.onChange(formData)
    }, [formData])

    const { ArrayField } = props.registry.fields

    const newSchema = {
        ...schema,
        enum: enumOptions,
        enumNames: enumNames
    }

    const _onChange = () => {

    }

    return (
        <ArrayField {...props} schema={newSchema} formData={formData} />
    )

}

export default ChildrenArrayField