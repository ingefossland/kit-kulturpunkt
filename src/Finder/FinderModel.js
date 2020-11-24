import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';
import { useTranslation } from 'react-i18next';

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview } = utils;

const FinderModel = ({
    model, 
    viewable = false,
    linkable = true,
    selectable = true, 
    editable = true, 
    deletable = true, 
    deleted = false,
    restorable = true, 
    eraseable = true,
    erased = false,
    children,
    ...props
}) => {
  
    const { modelName, id, uniqueId, mediaType, source, sourceId, } = model;

    const dispatch = useDispatch()

    /*

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    */

    const _onView = () => {
        props.onView || props.history && props.history.push(props.location.pathname + '/' + uniqueId)
    }

    const _onEdit = () => {
        props.onEdit || props.history && props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
    }

    const _onLink = () => {
        props.onLink || props.history && props.history.push(props.location.pathname + '/' + uniqueId + "/link")
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

    if (selected) {
        editable = false
        deletable = false
    }

    if (status === "trash") {
        deleted = true
        deletable = false
    }

    if (status === "erased") {
        erased = true
        selectable = false
        editable = false
        deletable = false
    }

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

    const { t, i18n } = useTranslation();

    const toolbar = getToolbar()

    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
                ...model,
                documentLabel: t('documentType:'+documentType),
                statusLabel: t('status:'+status),
                editable: editable,
                onEdit: _onEdit,
                viewable: viewable,
                onView: _onView,
                linkable: linkable,
                onLink: _onLink,
                selectable: selectable,
                selected: selected,
                onSelect: _onSelect,
                deletable: deletable,
                deleted: deleted,
                onDelete: _onDelete,
                restorable: restorable,
                onRestore: _onRestore,
                eraseable: eraseable,
                erased: erased,
                onErase: _onErase,
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