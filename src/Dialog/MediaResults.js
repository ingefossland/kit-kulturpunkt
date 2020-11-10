import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMediaSource } from '../redux/modelsById';

import ResultsList from "./ResultsList"
import ResultsGallery from "./ResultsGallery"
import ResultsUploads from "./ResultsUploads"

import { utils } from '@kit-ui/schema';
const { getDefaultFormState } = utils

const templates = {
    "list": ResultsList,
    "gallery": ResultsGallery,
    "uploads": ResultsUploads
}

const MediaResults = ({schema, formData, onChange, query = {}, search = {}, layout = "list", ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);
    const dispatch = useDispatch()

    // schema

    let itemSchema;

    if (schema.type === "array") {
        itemSchema = schema.items
    } else {
        itemSchema = schema
    }

    // set selected

    const [modelsSelected, setModelsSelected] = useState([])

    const getSelected = (formData) => {
        let items = []

        if (schema.type === "array") {
            items = formData || []
        } else {
            items = formData && [formData] || []
        }

        const selected = items.map(({media, mediaId}) => { 

            if (media.source && media.sourceId) {
                return media.source + "/" + media.sourceId
            }

            return mediaId
        })

        setModelsSelected(selected)
    }

    useEffect(() => {
        getSelected(formData)
    }, [formData])

    // change

    const handleChange = (formData) => {
        const newFormData = getDefaultFormState(schema, formData)
        onChange(newFormData);
    }

    // add

    const addModel = (model) => {
        
        const item = getDefaultFormState(itemSchema, {
            mediaId: model.uniqueId,
            media: model
        })

        let newFormData;

        if (schema.type === "array") {
            newFormData = [].concat(formData, item);
        } else {
            newFormData = item
        }

        handleChange(newFormData);

    }

    const handleAdd = (model) => {
        const { uniqueId, sourceId, mediaType } = model;

        console.log('addModel', model)

        if (sourceId) {
            console.log('sourceId', sourceId)

            const source = {
                ...model,
                identifier: sourceId,
                mimeType: mediaType,
                collectionId: query.collectionId
            }

            console.log('source', source)

            dispatch(getMediaSource({
                ...model,
                identifier: sourceId,
                mimeType: mediaType,
                collectionId: query.collectionId
            }, (model) => addModel(model)))

        } else if (uniqueId) {
            addModel(model)
        }
     
    }

    // remove

    const removeItem = ({uniqueId, source, sourceId}) => {
        return formData.filter(item => item.mediaId !== uniqueId)
    }
    
    const handleRemove = (model) => {
        const uniqueId = model && model.uniqueId

        console.log('remove', model)

        let newFormData;

        if (schema.type === "array") {
            newFormData = removeItem({uniqueId})
        } else {
            newFormData = getDefaultFormState(itemSchema, {
                mediaId: undefined,
                media: {}
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

export default MediaResults