import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { getModel } from "../modelsById/";
import { getQuery } from "../searchByUrl/";
import qs from 'query-string';

const treeSlice = createSlice({
    name: 'tree',
    initialState: {
        url: undefined,
        nodesExpanded: [],
        nodesById: {},
        url: undefined,
        treeParent: {},
        treeColumns: undefined
     }, 
    reducers: {
        requestTree(initialState, action) {
            const { models, url, apiUrl, query } = action.payload
            return {
                ...initialState,
            }
        },
        receiveTree(state, action) {
            const { url, resultsLoaded } = action.payload

            const treeRoot = url && {
                draggableId: url,
                droppableId: url,
                url: url
            }
        
            const treeParents = resultsLoaded && resultsLoaded.map(child => {
                return {
                    ...child,
                    draggableId: url + "/" + child.id,
                    droppableId: url + "/" + child.id,
                    url: url + "/" + child.uniqueId
                }
            })
    

            return {
                ...state,
                url,
                treeRoot,
                treeParents,
                treeColumns: [
                    {
                        parent: treeRoot,
                        children: treeParents
                    }
                ]
            }

        },
        toggleNode(state, action) {
            const { expanded, uniqueId } = action.payload
            const nodesExpanded = state.nodesExpanded

            if (nodesExpanded.includes(uniqueId)) {
                return {
                    ...state,
                    nodesById: {
                        ...state.nodesById,
                        [uniqueId]: {
                            expanded: !expanded
                        }
                    },
                    nodesExpanded: state.nodesExpanded.filter(id => id !== uniqueId)                    
                }
            }

            return {
                ...state,
                nodesById: {
                    ...state.nodesById,
                    [uniqueId]: {
                        expanded: !expanded
                    }
                },
                nodesExpanded: [
                    ...nodesExpanded,
                    uniqueId
                ]
            }

        },
        selectNode(state, action) {
            const { level, uniqueId, expanded, children, ...parent } = action.payload

            const columnParents = state.treeColumns.filter((col, index) => index <= level)

            if (expanded) {

                return {
                    ...state,
                    treeColumns: columnParents,
                    nodesById: {
                        [uniqueId]: {
                            expanded: false,
                        }
                    }
                }
    
            }

            const expandNode = {
                parent: {
                    ...parent,
                    uniqueId: uniqueId
                },
                children: children
            }

            return {
                ...state,
                treeColumns: [
                    ...columnParents,
                    expandNode
                ],
                nodesById: {
                    [uniqueId]: {
                        expanded: !expanded,
                    }
                }
            }

        },
        expandNode(state, action) {
            const { uniqueId } = action.payload

            const expanded = state.expanded

            if (expanded.includes(uniqueId)) {
                return state
            }

            return {
                ...state,
                expanded: [
                    ...expanded,
                    uniqueId
                ]
            }

        },
        collapseNode(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                expanded: state.expanded.filter(id => id !== uniqueId)
            }

        },
        addNode(state, action) {
            const { id, uniqueId, title } = action.payload

            const url = state.url

            const node = {
                id: id,
                uniqueId: uniqueId,
                title: title,
                draggableId: url + "/" + id,
                droppableId: url + "/" + id,
                url: url + "/" + uniqueId
            }

            return {
                ...state,
                treeParents: [
                    ...state.treeParents,
                    node
                ]
            }

        },
        removeNode(state, action) {
            const { id } = action.payload

            return {
                ...state,
                treeParents: state.treeParents.filter(child => child.id !== id)
            }
        }
    }
})

export const getTree = ({url = undefined, resultsLoaded}) => dispatch => {
    dispatch(receiveTree({url, resultsLoaded}))
}


export const dragNode = ({url, results}) => dispatch => {

    const _getNodeId = (treeNode) => {
        if (treeNode === url) {
            return null
        } else {
            return treeNode.replace(url + "/", "")
        }
    }

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
        dispatch(sortNode({
            id: id,
            parentId: parentId,
            sourceId: sourceId,
        }))
    }

}

export const sortNode = ({id, parentId, sourceId, destinationId}) => dispatch => {

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

        console.log('sorting', formData)

        id && dispatch(getModel({id}))
        parentId && dispatch(getModel({id: parentId})) //  || dispatch(getQuery(query))
        sourceId && dispatch(getModel({id: sourceId}))
        destinationId && dispatch(getModel({id: destinationId}))

        if (formData.parentId) {
            console.log('sortRemove', formData)
            dispatch(removeNode(formData))
        } else if (formData.uniqueId) {
            console.log('sortAdd', formData)
            dispatch(addNode(formData))
        }
    })
    
}

export const { 
    requestTree, receiveTree,
    removeNode, addNode,
    selectNode, toggleNode, expandNode, collapseNode    
} = treeSlice.actions

export default treeSlice.reducer