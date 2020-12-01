import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem, toggleMenuItem, sortMenuTree } from '../redux/finder';
import qs from 'query-string';

import TreeListView from "./DocumentTreeList"
import TreeColumnView from "./DocumentTreeColumn"
import FinderLayout from "./FinderLayout"

const DocumentTree = ({query = {}, ...props}) => {
    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    useEffect(() => {
        dispatch(getMenuItem(menuItem))
    }, [pathname])


    const [results, setResults] = useState(undefined)

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

        setResults({...results})
       
    }

    // setup documentTree

    const parents = finder.parents
    const parentsByUrl = finder.parentsByUrl

    const getChildren = ({children}) => {
        return children.map((child, index) => {
            child = {
                ...menuByUrl[child.url]
            }

            return {
                ...child,
                index: index,
                children: child.children && getChildren(child)
            }
        })
    }

    const documentTree = parents && parents.map((parent, index) => {
        parent = {
            ...menuByUrl[parent.url],
        }
        return {
            ...parent,
            index: index,
            children: parent.children && getChildren(parent)
        }
    })

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