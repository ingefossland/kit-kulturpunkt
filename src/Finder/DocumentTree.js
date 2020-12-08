import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem, toggleMenuItem, sortMenuTree } from '../redux/finder';
import { getQuery } from '../redux/searchByUrl';
import { receiveSave } from '../redux/modelsById';
import { API } from "../redux/settings"
import qs from 'query-string';

import TreeListView from "./DocumentTreeList"
import TreeColumnView from "./DocumentTreeColumn"
import FinderLayout from "./FinderLayout"

const DocumentTree = (props) => {
    const dispatch = useDispatch()

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const menuByUrl = finder && finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]
    const parents = finder && finder.parents

    const [treeParent, setTreeParent] = useState({})
    const [query, setQuery] = useState({})

    useEffect(() => {

        parents && parents.map(parent => {
            if (parent.type === "tree") {
                setTreeParent(parent) 
            }
        })


    }, [parents])

    // set top query from treeParent

    useEffect(() => {

        treeParent && treeParent.query && setQuery({
            ...treeParent.query,
            url: treeParent && treeParent.url,
            collectionId: app && app.collectionId,
            fl: "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        })

    }, [treeParent])

    // query

    let q = []
    
    query.q && q.push(query.q)
    sq.q && q.push(sq.q)

    useEffect(() => {

        query.url && dispatch(getQuery({
            ...query, 
            page: sq.page || 1,
            rows: sq.rows || 10,
            sort: sq.sort || query.sort || undefined,
            q: q && q.join(" ") || undefined,
        }))

    }, [query.url, sq.q, sq.sort, sq.rows])

    // get parent

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url] || {}
    const resultsLoaded = currentSearch && currentSearch.resultsLoaded

    const [parent, setParent] = useState(null)



    useEffect(() => {

        resultsLoaded && setParent({
            ...treeParent,
            children: resultsLoaded && resultsLoaded.map(child => {
                return {
                    ...child,
                    url: child && child.uniqueId && pathname + "/" + child.uniqueId
                }
            })
        })

    }, [resultsLoaded])

    // get children

    const _getChildren = ({uniqueId, id}) => {

        dispatch(getQuery({
            url: query.url + "/" + uniqueId,
            models: query.models,
            fl: query.fl,
            q: sq.q || undefined,
            parentId: id,
            fl: "id,parentId,uniqueId,title,imageUrl,documentType,mediaType,mediaWidth,mediaHeight,updatedByName",
        }))
        
    }

    useEffect(() => {
        parent && parent.children && parent.children.map(child => _getChildren(child))
    }, [parent])
    
    // actions

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

            const id = searchByUrl[draggableId].query.parentId
            const parentId = searchByUrl[destination.droppableId].query.parentId || null

            const queries = [
                {
                    ...searchByUrl[source.droppableId].query,
                    url: source.droppableId
                },
                {
                    ...searchByUrl[destination.droppableId].query,
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

            const id = searchByUrl[draggableId].query.parentId
            const parentId = searchByUrl[combine.draggableId].query.parentId || null

            const queries = [
                {
                    ...searchByUrl[source.droppableId].query,
                    url: source.droppableId
                },
                {
                    ...searchByUrl[combine.draggableId].query,
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
                parent={parent}
                getChildren={_getChildren}
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