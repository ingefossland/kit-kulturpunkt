import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadModel } from '../redux/modelsById';

import { ListModule, TableModule, GridModule, GalleryModule } from '@kit-ui/admin';
import { getUiPreview } from '@kit-ui/schema/lib';

import { useTranslation } from 'react-i18next';
import qs from 'query-string';

const layouts = {
    "table": TableModule,
    "list": ListModule,
    "grid": GridModule,     
    "gallery": GalleryModule,
}

const ModuleLoader = ({app, dialog, query, model, layout = "table", size = "medium", modelsSelected = [], onAdd, onRemove, ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);
    const dispatch = useDispatch()

    const schemasByName = {}

    const modelsById = useSelector(state => state.modelsById)
    const modelsBySource = {}

    const { uniqueId, source, sourceId, documentType, mediaType } = model;

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(loadModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    const appDocumentType = documentType && app && app.root + "/" + documentType
    const sourceDocumentType = source && "document/" + source

    let modelName = model.modelName === "doc_schemas" && "schemas" || model.modelName
    let modelSchema;

    if (modelName === "users") {
        modelSchema = schemasByName['user']
    } else if (modelName === "sites") {
        modelSchema = schemasByName['site']
    } else if (modelName === "collections") {
        modelSchema = schemasByName['collection']
    } else if (modelName === "doc_schemas") {
        modelSchema = schemasByName['schema']
    } else if (modelName === "documents" || documentType) {
        if (schemasByName[appDocumentType]) {
            modelSchema = schemasByName[appDocumentType]
        } else if (source && schemasByName[sourceDocumentType]) {
            modelSchema = schemasByName[sourceDocumentType]
        } else if (documentType) {
            modelSchema = schemasByName[documentType]
        }
    } else if (modelName === "media" || mediaType) {
        modelSchema = mediaType && schemasByName["media/"+mediaType]
    }


    const [preview, setPreview] = useState(model)

    const getImageUrl = (model) => {
        const { imageUrl, uploadStatus, uploadProgress } = model

        const imageUrlParts = imageUrl && imageUrl.split("?")
        const imageParams = imageUrlParts && imageUrlParts[1] && qs.parse(imageUrlParts[1])

        if (!imageParams) {
            return imageUrl
        }

        const newImageParams = qs.stringify({
            ...imageParams,
            uploadStatus: uploadStatus,
            uploadProgress: uploadProgress,
            dimension: "250x250"
        })

        const newImageUrl = imageUrlParts[0] + "?" + newImageParams
        
        return newImageUrl

    }

    const uniqueModel = source && sourceId && modelsBySource && modelsBySource[source + "/" + sourceId] || uniqueId && modelsById && modelsById[uniqueId]; //  || model

    useEffect(() => {
        let uiPreview = {}

        if (modelSchema && uniqueModel) {
            uiPreview = getUiPreview({...modelSchema, formData: uniqueModel, formContext: {t:t}})
        }

        const newModel = {
            ...uniqueModel,
            ...model,
            ...uiPreview,
        }

        const newImageUrl = getImageUrl(newModel)

        setPreview({
            ...newModel,
            imageUrl: newImageUrl,
        })

    }, [uniqueModel])

    const { status, createdAt, createdByName, updatedAt, updatedByName, deletedAt, deletedByName } = preview;

    const author = deletedByName || updatedByName || createdByName || "N/A"
    const datetime = deletedAt || updatedAt || createdAt

    const statusLabel = t("status:"+status || undefined)
    const LayoutTemplate = layout && layouts[layout]

    let selected;

    if (source && sourceId) {
        selected = modelsSelected && modelsSelected.includes(source + "/" + sourceId)
    } else if (uniqueId) {
        selected = modelsSelected && modelsSelected.includes(uniqueId)
    }

    const handleSelect = () => {

        console.log("ADD/REMOVE", uniqueModel)

        if (selected) {
            onRemove && onRemove(uniqueModel)
        } else {
            onAdd && onAdd(uniqueModel)
        }

    }

    const selectable = uniqueModel && true || false
    const onClick = selectable ? handleSelect : undefined

    return (
        <LayoutTemplate {...preview} size={size} 
            statusLabel={statusLabel} author={author} datetime={datetime}
            selectable={selectable} selected={selected} onClick={onClick} />
    )

}

export default ModuleLoader