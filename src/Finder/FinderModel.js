import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview } = utils;

const FinderModel = ({model, children, ...props}) => {
    const { modelName, uniqueId, mediaType, source, sourceId, } = model;

    const dispatch = useDispatch()

    /*

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    */

    const _onLink = () => {
        props.onLink || props.history && props.history.push('/checkout/' + uniqueId)
    }

    const _onEdit = () => {
        props.onEdit || props.history && props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
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

    const bulkById = useSelector(state => state.bulk.bulkById)
    const bulkModel = bulkById && bulkById[uniqueId] || {}

    // uiPreview
   
    const documentType = uniqueModel && uniqueModel.documentType || model && model.documentType
    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]
    const uiPreview = documentModel && uniqueModel.uniqueId && getUiPreview({...documentModel, formData: uniqueModel}) || {}

    // model

    model = {
        ...uniqueModel,
        ...model,
        ...bulkModel,
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

    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
                ...model,
                selectable: true,
                onEdit: _onEdit,
                onSelect: _onSelect,
                toolbar: toolbar,
            });
        }
        return child;
    });

    return (
        <>
            {childrenWithProps}
        </>
    )

}

export default FinderModel