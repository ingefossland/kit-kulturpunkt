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

    let actions = {}

    if (selectable) {
        actions.onSelect = () => _onSelect({uniqueId})
    }

    if (editable) {
        actions.onEdit = () => _onEdit({source, sourceId, uniqueId})
    }

    if (deletable) {
        actions.onDelete = () => _onDelete({modelName, uniqueId})
    }

    if (erasable) {
        actions.onErase = () => _onErase({modelName, uniqueId})
    }

    if (restorable) {
        actions.onRestore = () => _onRestore({modelName, uniqueId})
    }

    if (bulkCount) {
        actions = {
            onClick: () => _onSelect({uniqueId})
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