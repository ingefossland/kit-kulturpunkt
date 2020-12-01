import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem, toggleMenuItem, sortMenuTree } from '../redux/finder';
import { getQuery } from '../redux/searchById';
import qs from 'query-string';

import TreeListView from "./DocumentTreeList"
import TreeColumnView from "./DocumentTreeColumn"
import FinderLayout from "./FinderLayout"

const DocumentTree = ({query = {}, ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    const menuByUrl = finder && finder.menuByUrl

    // set query

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    let q = []

    query.q && q.push(query.q)
    sq.q && q.push(sq.q)

    query = {
        ...query,
        id: pathname,
        collectionId: app && app.collectionId,
        page: sq.page || 1,
        rows: sq.rows || 10,
        sort: sq.sort || query.sort || undefined,
        fl: "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        q: q && q.join(" ") || undefined,
    };


    // query

    useEffect(() => {
        query && dispatch(getQuery(query))
    }, [pathname, query.q, sq.sort, sq.rows])

    // search

    const searchById = useSelector(state => state.searchById)
    const currentSearch = searchById && searchById[query.id] || {}
    const resultsLoaded = currentSearch && currentSearch.resultsLoaded

    // setup documentTree

    const documentTree = resultsLoaded && resultsLoaded.map((parent, index) => {
        return {
            ...parent,
            index: index,
//            children: parent.children && getChildren(parent)
        }
    })    

    // actions

    const _onEdit = ({url}) => {
        const editUrl = url + "/edit"
        editUrl && props.history.push(editUrl)
    }

    const _onSelect = ({url}) => {
        if (sq) {
            url = url + "?" + qs.stringify(sq);
        }

        url && props.history.push(url)
    }

    const _onToggle = ({url}) => {
        url && dispatch(toggleMenuItem({url}))
    }    

    const _onCreate = ({url, id}) => {
        const parentId = Number.isInteger(id) && id || null
        const createUrl = url && url + "/new?" + qs.stringify({documentType: "pageTopic", parentId: parentId})
        createUrl && props.history.push(createUrl)
    }

    const _onDragEnd = (results) => {

        const { draggableId, source, destination, combine } = results

        if (source && destination && source.droppableId !== destination.droppableId) {

            dispatch(sortMenuTree({
                ...results,
                destination: {
                    ...menuByUrl[destination.droppableId],
                    ...destination,
                },
                source: {
                    ...menuByUrl[source.droppableId],
                    ...source,
                },
                item: menuByUrl[draggableId]
            }))

        } else if (combine && combine.draggableId !== source.droppableId && draggableId !== combine.draggableId) {

            dispatch(sortMenuTree({
                ...results,
                destination: {
                    ...menuByUrl[combine.draggableId],
                    ...destination,
                },
                source: {
                    ...menuByUrl[source.droppableId],
                    ...source,
                },
                item: menuByUrl[draggableId]
            }))            

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
                documentTree={documentTree}
                onToggle={_onToggle}
                onSelect={_onSelect}
                onEdit={_onEdit}
                onCreate={_onCreate}
                onDragEnd={_onDragEnd} />
        </FinderLayout>
    )



}

DocumentTree.defaultProps = {
}

export default DocumentTree