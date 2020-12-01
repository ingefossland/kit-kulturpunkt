import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem, toggleMenuItem, sortMenuTree } from '../redux/finder';
import { getQuery } from '../redux/searchById';
import { receiveSave } from '../redux/modelsById';
import { API } from "../redux/settings"
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

    // get children

    const _getChildren = ({uniqueId, id, url}) => {

        dispatch(getQuery({
            models: query.models,
            fl: query.fl,
            q: sq.q || undefined,
            id: url || pathname + "/" + uniqueId,
            parentId: id,
            fl: "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        }))
        
    }

    useEffect(() => {
        resultsLoaded && resultsLoaded.map(parent => _getChildren(parent))
    }, [resultsLoaded])
    
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

    const [results, setResults] = useState({})

    const _onSubmit = ({formData = {}, queries = []}) => {

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
            dispatch(receiveSave(formData))
            queries && queries.map(query => dispatch(getQuery(query)))
        })

    }

    const _onDragEnd = (results) => {

        const { draggableId, source, destination, combine } = results

        if (source && destination && source.droppableId !== destination.droppableId) {

            const id = searchById[draggableId].query.parentId
            const parentId = searchById[destination.droppableId].query.parentId || null

            const queries = [
                {
                    ...searchById[source.droppableId].query,
                    url: source.droppableId
                },
                {
                    ...searchById[destination.droppableId].query,
                    url: destination.droppableId
                }
            ]

            setResults({
                id: id,
                parentId: parentId,
                queries: queries
            })

            _onSubmit({
                formData: {
                    id: id,
                    parentId: parentId
                },
                queries: queries
            })


        } else if (combine && combine.draggableId !== source.droppableId && draggableId !== combine.draggableId) {

            const id = searchById[draggableId].query.parentId
            const parentId = searchById[combine.draggableId].query.parentId || null

            const queries = [
                {
                    ...searchById[source.droppableId].query,
                    url: source.droppableId
                },
                {
                    ...searchById[combine.draggableId].query,
                    url: combine.draggableId
                }
            ]

            setResults({
                id: id,
                parentId: parentId,
                queries: queries
            })

            _onSubmit({
                formData: {
                    id: id,
                    parentId: parentId
                },
                queries: queries
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
                getChildren={_getChildren}
                onToggle={_onToggle}
                onSelect={_onSelect}
                onEdit={_onEdit}
                onCreate={_onCreate}
                onDragEnd={_onDragEnd} />
                {JSON.stringify(results)}
        </FinderLayout>
    )



}

DocumentTree.defaultProps = {
}

export default DocumentTree