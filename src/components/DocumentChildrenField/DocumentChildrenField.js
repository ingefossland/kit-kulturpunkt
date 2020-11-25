import React, { useState, useEffect } from 'react';
import { WidgetSearch, List, ListModule, ButtonAdd, ButtonRemove } from "../"
import _ from "lodash"

import DocumentChildrenList from "./DocumentChildrenList"
import DocumentChildrenSearch from "./DocumentChildrenSearch"

import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchById';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils


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
        id: pathname + "/children",
        models: "documents",
        collectionId: collectionId,
        parentId: formData.id,
        fl: "id,parentId,uniqueId,title",
        q: "uniqueId:NOT " + uniqueId,
    }


    useEffect(() => {
        uniqueId && dispatch(getQuery(query))
    }, [uniqueId])

    const searchById = useSelector(state => state.searchById)
    const currentSearch = searchById && searchById[query.id]

    return (
        <div>

            <DocumentChildrenList {...currentSearch} />

            <DocumentChildrenSearch {...props} />

        </div>
    )


    

}

export default DocumentChildrenField