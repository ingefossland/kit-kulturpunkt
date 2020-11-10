import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDocumentSource } from '../redux/modelsById';

import ResultsList from "./ResultsList"
import ResultsGallery from "./ResultsGallery"

import { utils } from '@kit-ui/schema';
const { getDefaultFormState } = utils;

const templates = {
    "list": ResultsList,
    "gallery": ResultsGallery
}

const DocumentsResults = ({schema, formData, onChange, query = {}, search = {}, layout = "list", ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);
    const dispatch = useDispatch()

    let itemSchema;

    if (schema.type === "array") {
        itemSchema = schema.items
    } else {
        itemSchema = schema
    }

    const [modelsSelected, setModelsSelected] = useState([])

    const getSelected = (formData) => {
        let items = []

        if (schema.type === "array") {
            items = formData || []
        } else {
            items = formData && [formData] || []
        }

        console.log('ITEMS', items)

        const selected = items.map(({reference, referenceId}) => { 

            const uniqueId = reference && reference.uniqueId

            if (reference.source && reference.sourceId) {
                return reference.source + "/" + reference.sourceId
            }

            return uniqueId
        })

        setModelsSelected(selected)

        
    }

    useEffect(() => {
        getSelected(formData)
    }, [formData])

    const handleChange = (formData) => {
        const newFormData = getDefaultFormState(schema, formData)
        console.log("NEW", newFormData)
        onChange && onChange(newFormData);
        getSelected(newFormData);
    }

    const addModel = (model) => {

        console.log(itemSchema)

        const item = getDefaultFormState(itemSchema, {
            referenceId: model.uniqueId,
            reference: model
        })

        let newFormData;

        if (schema.type === "array") {
            newFormData = formData && formData.length && [].concat(formData, item) || [item];
        } else {
            newFormData = item
        }

        handleChange(newFormData);

    }

    const handleAdd = (model) => {
        const { source, sourceId, uniqueId, mediaType } = model;

        console.log('addModel', model)

        if (sourceId) {

            console.log('sourceId', sourceId)

            props.addDocumentSource({
                ...model,
                collectionId: query.collectionId
            }, (model) => addModel(model))

        } else if (source && uniqueId) {

            delete model.uniqueId
            
            console.log('sourceId', sourceId)

            dispatch(getDocumentSource({
                ...model,
                sourceId: uniqueId,
                collectionId: query.collectionId
            }, (model) => addModel(model)))

        } else if (uniqueId) {
            addModel(model)
        }
     
    }

    const removeItem = ({uniqueId}) => {
        return formData.filter(item => item.referenceId !== uniqueId)
    }
    
    const handleRemove = (model) => {
        const uniqueId = model && model.uniqueId

        console.log('remove', model)

        let newFormData;

        if (schema.type === "array") {
            newFormData = removeItem({uniqueId})
        } else {
            newFormData = getDefaultFormState(itemSchema, {
                referenceId: undefined,
                reference: {}
            })
        }

        handleChange(newFormData);

    }

    // get template

    const ResultsTemplate = templates && templates[layout]

    if (!ResultsTemplate) {
        return (
            <p>No template for {layout}</p>
        )
    }

    return (
        <ResultsTemplate 
            {...props}
            {...search}
            selected={modelsSelected}
            query={query}
            onAdd={handleAdd}
            onRemove={handleRemove} />
    )    

}

export default DocumentsResults