import React, { useState, useEffect } from 'react';
import { WidgetSearch, List, ListModule, ButtonAdd, ButtonRemove } from "../"
import _ from "lodash"

import DocumentListRemove from "./DocumentListRemove"

import { useSelector, useDispatch } from 'react-redux';
import { getParents } from '../../redux/modelsById';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from "@rjsf/core";
const { getUiOptions } = utils;


const DocumentParentsField = (props) => {
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

    // currentParent

    const query = {
        url: pathname + "/parents",
        models: "documents",
        collectionId: collectionId,
        fl: "id,parentId,uniqueId,title",
        q: "id:"+parentId,
        ...uiQuery
    }

    useEffect(() => {
        parentId && dispatch(getQuery(query))
    }, [parentId])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]

    const uniqueModel = useSelector(state => state.modelsById[uniqueId])

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

            <DocumentListRemove {...currentSearch} title="Parents" onRemove={_onRemove} onEdit={_onEdit} />

            {JSON.stringify(uniqueModel.parents)}



        </div>
    )


    

}

export default DocumentParentsField