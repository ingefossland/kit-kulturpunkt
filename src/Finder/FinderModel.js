import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';
import { useTranslation } from 'react-i18next';

import schemasByName from "../app/schemas/schemasByName"

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
    erasable = true,
    erased = false,
    children,
    ...props
}) => {

    const { t, i18n } = useTranslation();

    const { modelName, id, uniqueId, source, sourceId, } = model;

    const dispatch = useDispatch()

    /*

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    */

    const _onClick = props.onClick

    const _onView = () => {
        props.onView && props.onView() || props.history && props.history.push(props.location.pathname + '/' + uniqueId)
    }

    const _onEdit = () => {
        props.onEdit && props.onEdit() || props.history && props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
    }

    const _onLink = () => {
        props.onLink && props.onLink() || props.history && props.history.push(props.location.pathname + '/' + uniqueId + "/link")
    }

    const _onDelete = () => {
        props.onDelete && props.onDelete() || dispatch(deleteModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onRestore = () => {
        props.onRestore && props.onRestore() || dispatch(restoreModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onErase = () => {
        props.onErase && props.onErase() || dispatch(eraseModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onSelect = () => {
        props.onSelect && props.onSelect() || dispatch(selectModel({modelName: modelName, uniqueId: uniqueId}))
    }

    // uniqueModel

    const modelsById = useSelector(state => state.modelsById)
    const uniqueModel = modelsById && modelsById[uniqueId] || {}

    const bulkById = useSelector(state => state.bulk.bulkById)
    const bulkModel = bulkById && bulkById[uniqueId] || {}

    // uiPreview
   
    const documentType = uniqueModel && uniqueModel.documentType || model && model.documentType
    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]


    const mediaType = uniqueModel && uniqueModel.mediaType || model && model.mediaType
    const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]

    const uiPreview = documentModel && uniqueModel.uniqueId && getUiPreview({...documentModel, formData: uniqueModel}) || {}

    // model

    model = {
        ...uniqueModel,
        ...bulkModel,
        ...model,
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

    /*

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

    */

    const mediaLabel = mediaType && t('mediaType:'+mediaType)
    const documentLabel = documentType && t('documentType:'+documentType)

    const modelLabel = documentLabel || mediaLabel
    const statusLabel = t('status:'+status)

    const author = model.deletedByName || model.updatedByName || model.createdByName || "N/A"
    const datetime = model.deletedAt || model.updatedAt || model.createdAt

    model = {
        ...model,
        modelLabel: modelLabel,
        mediaLabel: mediaLabel,
        documentLabel: documentLabel,
        statusLabel: statusLabel,
        author: author,
        datetime: datetime,
    }


    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {

            return React.cloneElement(child, { 
                ...model,
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
                erasable: erasable,
                erased: erased,
                onErase: _onErase,
                onClick: _onClick,
                ...props
//                ...child.props
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