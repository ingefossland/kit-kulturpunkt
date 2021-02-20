import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TreeListView from "./FinderViewTree"

const DocumentTree = ({url, resultsLoaded, ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const parent = finder.parent

    const modelsById = useSelector(state => state.modelsById)



    const treeRoot = url

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

    const treeParent = treeRoot && {
        ...parent,
        children: treeChildren,
        draggableId: treeRoot,
        droppableId: treeRoot,
        url: treeRoot
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

    const _onCreate = () => {
        
    }

    const _onChange = () => {

    }

    const _onToggle = () => {
        
    }
   
    const _onSelect = ({url}) => {

        /*

        if (sq) {
            url = url + "?" + qs.stringify(sq);
        }

        url && props.history.push(url)

        const uniqueId = _getNodeId(url)
        uniqueId && getModel(uniqueId)

        */

    }

    // viewOptions


    return (
        <TreeListView 
            treeRoot={treeRoot}
            treeParent={treeParent}
            treeChildren={treeChildren}
            onToggle={_onToggle}
            onSelect={_onSelect}
            onCreate={_onCreate}
            onDragEnd={_onDragEnd} />
    )



}

DocumentTree.defaultProps = {
}

export default DocumentTree