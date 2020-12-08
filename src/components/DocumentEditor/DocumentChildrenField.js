import React, { useState, useEffect } from 'react';
import { WidgetSearch, List, ListModule, ButtonAdd, ButtonRemove } from "../"
import _ from "lodash"

import DocumentChildrenList from "./DocumentChildrenList"
import DocumentChildrenSearch from "./DocumentChildrenSearch"

import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from "@rjsf/core";
const { getUiOptions } = utils;


const DocumentChildrenField = (props) => {
    const { schema, uiSchema } = props;

    const dispatch = useDispatch()

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const editor = useSelector(state => state.editor)
    const { pathname, formData } = editor;

    // id, uniqueId + collectionId

    const id = formData && formData.id
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
    }


    useEffect(() => {
        uniqueId && dispatch(getQuery(query))
    }, [uniqueId])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]

    return (
        <div>

            <DocumentChildrenList {...currentSearch} />

            <DocumentChildrenSearch {...props} />

        </div>
    )


    

}

export default DocumentChildrenField