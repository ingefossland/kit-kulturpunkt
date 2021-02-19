import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getPreview, getEditor, collapseEditor } from '../redux/finder';

import { 
    PreviewBase, 
    PreviewOptions, 
    PreviewJSON
} from "@kit-ui/admin"

import PreviewGrid from "../components/PrimusPreview/PreviewGrid"
import PreviewList from "./BulkPreviewList"
import PreviewGallery from "./BulkPreviewGallery"
import PreviewMasonry from "./BulkPreviewMasonry"

import { schemasByName } from "./schemas"
import { getUiPreview } from "./utils"

const BulkPreview = () => {

    const { t, i18n } = useTranslation('finder');

    const bulk = useSelector(state => state.bulk)
    const modelsById = useSelector(state => state.modelsById)
    const dispatch = useDispatch()

    const items = bulk.items && bulk.items.map(uniqueId => {

        const model = modelsById[uniqueId] || {}

        const image = model && model.content && model.content.media && model.content.media[0] && model.content.media[0].media
        const mediaWidth = model && model.mediaWidth || image && image.mediaWidth
        const mediaHeight = model && model.mediaHeight || image && image.mediaHeight

        const documentType = model && model.documentType
        const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]
    
        const mediaType = model && model.mediaType
        const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]
    
        const collectionType = model && model.collectionType
        const collectionModel = collectionType && schemasByName && schemasByName["collections/" + collectionType]
        
        const schemaModel = documentModel || mediaModel || collectionModel
    
        const uiPreview = schemaModel && uniqueId && getUiPreview({...schemaModel, formData: model}) || {}
    

        return {
            ...model,
            ...uiPreview,
            mediaWidth: mediaWidth,
            mediaHeight: mediaHeight,
            uniqueId: uniqueId,
//            selected: true
        }

    })

    // bulk

    const bulkCount = bulk.count
    const bulkTitle = t('{{count}} selected', {count: bulkCount})

    // previewOptions

    const previewOptions = [
        /*
        {
            "title": "Grid",
            "value": "grid",
            "template": PreviewGrid
        },
        */
        {
            "title": "List",
            "value": "list",
            "template": PreviewList
        },
        {
            "title": "Gallery",
            "value": "gallery",
            "template": PreviewGallery
        },
        {
            "title": "Masonry",
            "value": "masonry",
            "template": PreviewMasonry
        },
        /*
        {
            "title": "JSON",
            "value": "formData",
            "template": () => <PreviewJSON>{items}</PreviewJSON> 
        }*/
    ]        

    // bulkAction

    const _onBulkEdit = () => {
        dispatch(getEditor({
            "expanded": true,
            "title": t('Edit selected'),
            "model": "editor"
        }))
        
    }

    const _onCreateReport = () => {
        dispatch(getEditor({
            "expanded": true,
            "title": t('Create report'),
            "model": "report"
        }))
        
    }

    const bulkAction = {
        "title": t("Action"),
        "children": [
            {

                "icon": "edit",
                "title": t('Edit selected'),
                "onClick": _onBulkEdit
            },
            {
                "icon": "trending_up",
                "title": t('Create report'),
                "onClick": _onCreateReport
            },
            {
                "children": [
                    {
                        "title": t('Export to {{format}}', {format: "PDF"})
                    },
                    {
                        "title": t('Export to {{format}}', {format: "Excel"})
                    }
                ]
            }
            
        ]

    }
    
    // related

    const [value, setValue] = useState(previewOptions[0].value)

    const _onChange = (value) => {
        setValue(value)
    }

    const currentPreview = previewOptions.find(option => option.value === value)
    const PreviewTemplate = currentPreview && currentPreview.template

    return (
        <PreviewBase>
            <PreviewTemplate title={bulkTitle} viewAction={bulkAction} items={items} />
            <PreviewOptions options={previewOptions} value={value} onChange={_onChange} />
        </PreviewBase>
    )

    return (
        <PreviewGrid items={items} />
    )

}

export default BulkPreview