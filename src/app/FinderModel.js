import React, { useRef, useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getModel, getChildren, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import { getUiModel } from "./utils"

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

    const { t, i18n } = useTranslation();

    const location = useLocation()
    const history = useHistory()
    
    // actions

    const dispatch = useDispatch()

    const _onEdit = (event, {source, sourceId, uniqueId}) => {
        event.stopPropagation()

        let editUrl = location.pathname + "/" + uniqueId + "/edit"
        editUrl = editUrl.replace("//", "/")

        console.log(editUrl)
        history.push(editUrl)

    }

    const _onDelete = (event, {modelName, uniqueId}) => {
        event.stopPropagation()
        dispatch(deleteModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onRestore = (event, {modelName, uniqueId}) => {
        event.stopPropagation()
        dispatch(restoreModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onErase = (event, {modelName, uniqueId}) => {
        event.stopPropagation()
        dispatch(eraseModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onSelect = (event, model) => {
        event.stopPropagation()
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


    // uniqueItem

    const uniqueModel = modelsById[uniqueId] || {}

    // get children?

    useEffect(() => {
        if (uniqueModel.id && !uniqueModel.children && props.getChildren) {
            dispatch(getChildren(uniqueModel))
        }
    }, [uniqueModel.id])

    // uiModel

    const uiModel = getUiModel({model: props, modelsById, t})

    // model

    const model = {
        ...uiModel,
        uniqueId: uniqueId,
        selected: bulkItems.includes(uniqueId),
    }

    // capabilities

    const { status, selected } = model

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

    const actions = {
        onSelect: (event) => _onSelect(event, {uniqueId}),
        onEdit: (event) => _onEdit(event, {source, sourceId, uniqueId}),
        onDelete: (event) => _onDelete(event, {modelName, uniqueId}),
        onErase: (event) => _onErase(event, {modelName, uniqueId}),
        onRestore: (event) => _onRestore(event, {modelName, uniqueId})
    }
    
    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                ...model,
                ...child.props,
                ...actions,
                ...capabilities,
            });
        }
        return child;
    });

    return childrenWithProps

    return <>{childrenWithProps}</>

}

export default FinderModel;