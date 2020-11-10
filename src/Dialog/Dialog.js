import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from '../redux/app';

import MediaDialog from "./MediaDialog"
import DocumentsDialog from "./DocumentsDialog"
import SearchDialog from "./SearchDialog"

import { utils } from '@kit-ui/schema';
const  { getUiOptions } = utils

const templates = {
    "media": MediaDialog,
    "documents": DocumentsDialog,
    "search": SearchDialog
}

const EditorDialog = (props) => {
    const dispatch = useDispatch()

    console.log("DIALOG", props)

    

    const { schema = {}, uiSchema = {}, onChange, onClose } = props;

    const [formData, setFormData] = useState(props.formData)

    useEffect(() => {
        setFormData(props.formData)
    }, [props.formData])

    const _onChange = (formData) => {
        setFormData(formData)
        onChange(formData);
    }

    const app = useSelector(state => state.app)

    let itemSchema;

    if (schema && schema.type === "array") {
        itemSchema = schema.items
    } else if (schema) {
        itemSchema = schema
    }

    const getReferenceQuery = (query) => {
        const documentSchema = itemSchema && itemSchema.properties && itemSchema.properties.reference
        const documentType = documentSchema && documentSchema.properties.documentType
    
        query.documentType = "*"
    
        if (documentType && documentType.enum) {
            query.documentType = documentType.enum
        }
    
        if (documentType && documentType.default) {
            query.documentType = documentType.default
        }

        return {
            ...query,
            models: "documents"
        } 
        
    }

    const getMediaQuery = (query) => {
        const mediaSchema = itemSchema && itemSchema.properties && itemSchema.properties.media
        const mediaType = mediaSchema && mediaSchema.properties.mediaType
    
//        query.mediaType = "*"

        if (mediaType && mediaType.enum) {
            query.mediaType = mediaType.enum
        }
    
        if (mediaType && mediaType.default) {
            query.mediaType = mediaType.default
        }

        return {
            ...query,
            models: "media"
        }
        
    }

    const getQuery = () => {

        const uiOptions = uiSchema && getUiOptions(uiSchema)

        const { dialog } = uiOptions

        if (dialog && dialog.query) {
            return {
                ...dialog.query,
                siteId: app.siteId,
                collectionId: app.collectionId
            }
        }


        if (itemSchema.properties && itemSchema.properties.referenceId) {
            return getReferenceQuery({
                siteId: app.siteId,
                collectionId: app.collectionId
            })
        }

        if (itemSchema.properties && itemSchema.properties.mediaId) {
            return getMediaQuery({
                siteId: app.siteId,
                collectionId: app.collectionId
            })
        }

        return {
        }

    }

    const query = getQuery()
    const template = query.models;

    const DialogTemplate = template && templates[template]; // || templates["search"]

    if (!DialogTemplate) {
        return (
            <div>
                Missing template for {JSON.stringify(props)}.
                <button onClick={onClose}>Close</button>
            </div>
        )
    }

    return (
        <DialogTemplate query={query} schema={schema} formData={formData} onChange={_onChange} onClose={onClose} /> 
    )

}

export default EditorDialog