import React, { useRef, useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getModel, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';
import qs from 'query-string';

import { schemasByName } from "./schemas"
import { getUiPreview } from "./utils"


const FinderModel = ({
    onClick,
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

    const { t, i18n } = useTranslation('search');

    const location = useLocation()
    const history = useHistory()
    

    // actions

    const dispatch = useDispatch()

    const _onEdit = ({source, sourceId, uniqueId}) => {

        let editUrl = location.pathname + "/" + uniqueId + "/edit"
        editUrl = editUrl.replace("//", "/")

        console.log(editUrl)


        history.push(editUrl)

    }

    const _onDelete = ({modelName, uniqueId}) => {
        dispatch(deleteModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onRestore = ({modelName, uniqueId}) => {
        dispatch(restoreModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onErase = ({modelName, uniqueId}) => {
        dispatch(eraseModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onSelect = (model) => {
        dispatch(selectModel(model))
    }

    // items

    const bulk = useSelector(state => state.bulk)
    const bulkItems = bulk.items    
    const bulkCount = bulk.count    

    // get model

    const modelsById = useSelector(state => state.modelsById)

    const { modelName, source, sourceId } = props;

    const uniqueId = props.uniqueId || source + "/" + sourceId

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel(props))
        }
    }, [uniqueId])


    /*

    // get action

    const uiAction = bulkCount && {
        onClick: () => _onSelect({uniqueId})
    } || {
        onSelect: () => _onSelect({uniqueId}),
        onEdit: () => _onEdit({source, sourceId, uniqueId})
    }

    */

    // uniqueItem

    const uniqueModel = modelsById[uniqueId] || {}

    // uiPreview

    const documentType = uniqueModel && uniqueModel.documentType || props.documentType
    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]

    const mediaType = uniqueModel && uniqueModel.mediaType || props.mediaType
    const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]

    const collectionType = uniqueModel && uniqueModel.collectionType || props.collectionType
    const collectionModel = collectionType && schemasByName && schemasByName["collections/" + collectionType]
    
    const schemaModel = documentModel || mediaModel || collectionModel

    const uiPreview = schemaModel && uniqueModel.uniqueId && getUiPreview({...schemaModel, formData: uniqueModel}) || {}
    
    const model = {
        ...props,
        ...uniqueModel,
        ...uiPreview,
        uniqueId: uniqueId,
        selected: bulkItems.includes(uniqueId),
    }

    // capabilities

    const { selected, status } = model

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

    if (props.sourceId) {
        editable = false
        deletable = false
    }

    if (selected || bulkCount) {
        editable = false
        deletable = false
    }

    // actions

    const capabilities = {
        selectable: selectable,
        selected: selected,
        editable: editable,
        deletable: deletable,
        deleted: deleted,
        restorable: restorable,
        erasable: erasable,
        erased: erased,

    }

    let actions = {}

    if (bulkCount) {
        actions = {
            onClick: () => _onSelect({uniqueId})
        }
    } else {
        actions = {
            onSelect: () => _onSelect({uniqueId}),
            onEdit: () => _onEdit({source, sourceId, uniqueId}),
            onDelete: () => _onDelete({modelName, uniqueId}),
            onErase: () => _onErase({modelName, uniqueId}),
            onRestore: () => _onRestore({modelName, uniqueId}),
        }
    }

    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                ...capabilities,
                ...model,
                ...actions,
//                ...child.props
            });
        }
        return child;
    });

    return childrenWithProps

    return <>{childrenWithProps}</>

}

export default FinderModel;