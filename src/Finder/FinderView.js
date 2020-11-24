import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import List from "./ListView"
import Masonry from "./MasonryLayout"
import Gallery from "./GalleryLayout"
import ColumnView from "./ColumnView"

import schemasByName from "../schemas/schemasByName"

import { utils } from '@kit-ui/schema';
const { getUiPreview } = utils;

const FinderView = ({view = "list", template, ...props}) => {

    const templates = {
        "list": List,
        "masonry": Masonry,
        "gallery": Gallery,
        "media": Gallery,
        "column": ColumnView
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
    }
    
    const Template = template || List


    if (Template) {
        return (
            <Template {...props} />
        )
        
    }


}

FinderView.defaultProps = {
}

export default FinderView