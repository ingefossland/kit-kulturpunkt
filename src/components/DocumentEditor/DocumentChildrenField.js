import React, { useState, useEffect } from 'react';
import { WidgetSearch, List, ListModule, ButtonAdd, ButtonRemove } from "../"
import _ from "lodash"

import DocumentListRemove from "./DocumentListRemove"
import DocumentListSearch from "./DocumentListSearch"

import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from "@rjsf/core";
const { getUiOptions } = utils;


const DocumentChildrenField = (props) => {
    const { schema, idSchema, uiSchema, formContext } = props;

    const dispatch = useDispatch()

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)
    const { pathname, formData } = editor;

    // id, uniqueId + collectionId

    const parentId = formData && formData.parentId
    const uniqueId = formData && formData.uniqueId
    const collectionId = formData && formData.collectionId

    // currentChildren

    const query = {
        url: pathname + "/children",
        models: "documents",
        collectionId: collectionId,
        parentId: formData.id,
        fl: "id,parentId,uniqueId,title",
        q: "uniqueId:NOT " + uniqueId,
        ...uiQuery
    }


    useEffect(() => {
        uniqueId && dispatch(getQuery(query))
    }, [uniqueId, parentId])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]

    // actions

    const onSelect = formContext && formContext.onSelect

    const _onRemove = ({uniqueId}) => {

    }

    const _onEdit = ({uniqueId}) => {
        const id = idSchema && idSchema.$id
        const url = app.root + "/" + uniqueId + "/edit#" + id
        onSelect && onSelect({url})
    }

    return (
        <div>

            <DocumentListRemove {...currentSearch} title="Children" onRemove={_onRemove} onEdit={_onEdit} />

            <DocumentListSearch {...props} />

        </div>
    )


    

}

export default DocumentChildrenField