import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModel, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import { ListModule, TableModule, GridModule, GalleryModule } from '@kit-ui/admin';

import MasonryModule from "../components/Masonry/MasonryModule"

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview } = utils;

const layouts = {
    "table": TableModule,
    "list": ListModule,
    "grid": GridModule,
    "masonry": MasonryModule,
    "gallery": GalleryModule,
}


const FinderModel = ({model, layout = "list", ...props}) => {
    const { modelName, uniqueId, documentType, mediaType, source, sourceId, } = model;

    const dispatch = useDispatch()

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    const _onLink = () => {
        props.history.push('/checkout/' + uniqueId)
    }

    const _onEdit = () => {
        props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
    }

    const _onDelete = () => {
        dispatch(deleteModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onRestore = () => {
        dispatch(restoreModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onErase = () => {
        dispatch(eraseModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onSelect = () => {
        dispatch(selectModel({modelName: modelName, uniqueId: uniqueId}))
    }

    // uniqueModel

    const modelsById = useSelector(state => state.modelsById)
    const uniqueModel = modelsById && modelsById[uniqueId] || {}

    // uiPreview
   
    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]
    const uiPreview = documentModel && uniqueModel.uniqueId && getUiPreview({...documentModel, formData: uniqueModel}) || {}

    // model

    model = {
        ...uniqueModel,
        ...model,
        ...uiPreview
    }


    const { selected, status } = model

    const getToolbar = () => {

        if (selected) {
            return false
        }

        if (status === "erased") {
            return false
        }

        if (status === "trash") {
            return [
                {
                    icon: "restore",
                    onClick: _onRestore
                },
                {
                    icon: "delete_forever",
                    onClick: _onErase
                },
                
            ]
        }

        return [
            {
                icon: "edit",
                onClick: _onEdit
            },
            {
                icon: "delete",
                onClick: _onDelete
            },
            {
                icon: "links",
                onClick: _onLink
            }
        ]

    }

    const toolbar = getToolbar()

    const ModuleTemplate = layout && layouts[layout]

    return (
        <ModuleTemplate {...model} 
            description={false}
            selectable={true}
            onEdit={_onEdit}
            onSelect={_onSelect}
            toolbar={toolbar} />
    )

}

export default FinderModel