import React, { useState, useEffect } from 'react';
import _ from "lodash"

import { 
    ListSearch,
    ListView, 
    ListModule, 
    ButtonAdd, 
    ButtonRemove
} from "@kit-ui/admin"


import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../../redux/searchByUrl';
import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const DocumentChildrenSearch = (props) => {
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

    // add children

    const [q, setQ] = useState("")
    const [list, setList] = useState([])

    const queryQ = [
        "uniqueId:NOT " + uniqueId,
        "parentId:NOT " + id,
        q
    ]

    const query = {
        url: pathname + "/children/search",
        models: "documents",
        collectionId: collectionId,
        fl: "id,parentId,uniqueId,title",
        q: queryQ.join(' '),
        ...uiQuery
    }

    // query

    useEffect(() => {
        query && dispatch(getQuery(query))
    }, [q])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url]
    const resultsLoaded = currentSearch && currentSearch.resultsLoaded

    // onAdd and onRemove

    const _onAdd = ({uniqueId}) => {
        uniqueId && setList([...list, uniqueId])
    }

    const _onQuery = _.debounce((q, event) => {
        setQ(q)
    }, 500)

    return (

        <ListView>
            <ListSearch onChange={_onQuery} />
            {resultsLoaded && resultsLoaded.map(model => <ListModule {...model} primaryButton={<ButtonAdd />} />)}
        </ListView>

    )
    

}

export default DocumentChildrenSearch