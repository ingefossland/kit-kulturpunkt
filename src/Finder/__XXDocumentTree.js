import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import TreeViewList from "./TreeViewList"
import TreeViewColumn from "./TreeViewColumn"

const TreeView = ({view = "list", template, ...props}) => {

    const { t, i18n } = useTranslation()

    const templates = {
        "list": TreeViewList,
        "column": TreeViewColumn
    }

    // actions

    const dispatch = useDispatch()

    const _onEdit = ({uniqueId}) => {
        uniqueId && props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
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

    const _onSelect = ({modelName, uniqueId}) => {
        dispatch(selectModel({modelName: modelName, uniqueId: uniqueId}))
    }

    // template

    if (!template && templates[view]) {
        template = templates[view]
    } else if (!template) {
        template = "list"
    }
    
    const Template = template

    if (Template) {
        return (
            <Template {...props} />
        )
        
    }


}

TreeView.defaultProps = {
}

export default TreeView