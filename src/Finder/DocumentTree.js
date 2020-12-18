import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../redux/searchByUrl';
import { getModel } from '../redux/modelsById';
import { API } from "../redux/settings"
import qs from 'query-string';

import TreeListView from "./DocumentTreeList"
import TreeColumnView from "./DocumentTreeColumn"
import FinderLayout from "./FinderLayout"

const DocumentTree = ({url, query, ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const parent = finder.parent

    const modelsById = useSelector(state => state.modelsById)

    // set query

    const sq = props.location.search && qs.parse(props.location.search)

    let q = []

    query.q && q.push(query.q)
    sq.q && q.push(sq.q)

    query = {
        ...query,
        url: url,
        collectionId: query.collectionId || app && app.collectionId,
        siteId: query.siteId || app && app.siteId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: query.fl || "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        q: q && q.join(" ") || undefined,
    };

    // query

    useEffect(() => {
        query.models && dispatch(getQuery(query))
    }, [url, query.models, query.q, sq.sort, sq.rows])

    // get search

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url] || {}
    const resultsLoaded = currentSearch && currentSearch.resultsLoaded




    const _onToggle = ({url}) => {
//        url && dispatch(toggleMenuItem({url}))
    }    

    const _onCreate = ({url, id}) => {
        const parentId = Number.isInteger(id) && id || null
        const createUrl = url && url + "/new?" + qs.stringify({documentType: "pageTopic", parentId: parentId})
        createUrl && props.history.push(createUrl)
    }



    const _onChange = ({id, parentId, sourceId, destinationId}) => {

        const formData = {
            id: id,
            parentId: parentId
        }

        const url = API + '/admin/api/documents';

        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(formData)
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(formData => {
            id && dispatch(getModel({id}))
            parentId && dispatch(getModel({id: parentId})) || dispatch(getQuery(query))
            sourceId && dispatch(getModel({id: sourceId}))
            destinationId && dispatch(getModel({id: destinationId}))
        })
        
    }

    const treeRoot = query.url

    const _getNodeId = (treeNode) => {
        if (treeNode === treeRoot) {
            return null
        } else {
            return treeNode.replace(treeRoot + "/", "")
        }
    }

    // treeRoot

    const treeChildren = resultsLoaded && resultsLoaded.map(child => {
        return {
            ...child,
            draggableId: treeRoot + "/" + child.id,
            droppableId: treeRoot + "/" + child.id,
            url: treeRoot + "/" + child.uniqueId
        }
    })

    const treeParent = {
        ...parent,
        children: treeChildren,
        draggableId: query.url,
        droppableId: query.url,
        url: query.url
    }

    const _onSelect = ({url}) => {

        if (sq) {
            url = url + "?" + qs.stringify(sq);
        }

        url && props.history.push(url)

        const uniqueId = _getNodeId(url)

        uniqueId && getModel(uniqueId)

    }

    const _onDragEnd = (results) => {

        const { draggableId, source, destination, combine } = results

        let id, parentId, sourceId, destinationId

        if (source && destination && source.droppableId !== destination.droppableId) {

            id = _getNodeId(draggableId)
            parentId = _getNodeId(destination.droppableId)
            sourceId = _getNodeId(source.droppableId)

        } else if (combine && combine.draggableId !== source.droppableId && draggableId !== combine.draggableId) {

            id = _getNodeId(draggableId)
            parentId = _getNodeId(combine.draggableId)
            sourceId = _getNodeId(source.droppableId)

        }

        if (id && id !== parentId) {

            _onChange({
                id: id,
                parentId: parentId,
                sourceId: sourceId,
            })

        }

    }

    // viewOptions

    const viewOptions = ["list","column"]
    const view = sq.view || viewOptions[0]

    const _onView = (view) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, view: view});
        props.history.replace(url)
    }

    // template

    const templates = {
        "list": TreeListView,
        "column": TreeColumnView
    }
    
    let template;

    if (!template && templates[view]) {
        template = templates[view]
    } else if (!template) {
        template = "list"
    }
    
    const Template = template

    return (
        <FinderLayout {...finder} viewOptions={viewOptions} view={view} onView={_onView}>
            <Template {...props} 
                {...currentSearch}
                treeRoot={treeRoot}
                treeParent={treeParent}
                treeChildren={treeChildren}
                onToggle={_onToggle}
                onSelect={_onSelect}
                onCreate={_onCreate}
                onDragEnd={_onDragEnd} />
        </FinderLayout>
    )



}

DocumentTree.defaultProps = {
}

export default DocumentTree