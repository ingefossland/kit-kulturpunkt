import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TreeView, TreeList, TreeModule } from "../components"
import { getTree, dragNode, sortNode, toggleNode } from '../redux/tree';
import { useHistory, useLocation } from "react-router-dom";

import FinderModel from "./FinderModel"

const FinderViewTree = ({
    query = {},
    url,
    resultsLoaded,
    ...props
}) => {

    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        url && resultsLoaded && dispatch(getTree({url, resultsLoaded}))
    }, [url, resultsLoaded])

    const modelsById = useSelector(state => state.modelsById)

    const { treeRoot, treeParents, nodesById } = useSelector(state => state.tree)

    const _onToggle = (node) => {
        dispatch(toggleNode(node))
    }

    const _onDragEnd = (results) => {
        dispatch(dragNode({url, results}))
    }

    const DraggableChild = ({child, level, index}) => {

        child = {
            ...child,
            draggableId: url + "/" + child.id,
            droppableId: url + "/" + child.id,
            url: url + "/" + child.uniqueId
        }

        const uniqueModel = modelsById && modelsById[child.uniqueId]
        const uniqueNode = nodesById && nodesById[child.uniqueId]
        const children = uniqueModel && uniqueModel.children || []

        child = {
            ...child,
            ...uniqueModel,
            ...uniqueNode,
            selectable: false,
            collapsible: children.length && true,
        }
    
        const _renderChildren = () => {

            if (!children || !child.expanded) {
                return false
            }

            return (
                <DroppableChildren parent={child} children={children} level={level+1} />
            )

        }

        return (
            <Draggable index={index} draggableId={child.draggableId} key={child.draggableId}>
                {(provided, snapshot) => (
                    <FinderModel {...child}
                            index={index}
                            level={level}
                            onToggle={() => _onToggle(child)}
                            draggable={{provided, snapshot}} 
                            getChildren={true}
                            renderChildren={_renderChildren}>
                        <TreeModule />
                    </FinderModel>
                )}
            </Draggable>
        )

    }

    const DroppableChildren = ({parent, children, index, level}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.droppableId} key={parent.droppableId}>
                {(provided, snapshot) => (
                    <TreeList droppable={{provided, snapshot}}>
                        {children && children.map((child, index) => {
                            return (
                                <DraggableChild child={child} level={level} index={index} key={index} />
                            )
                        })}
                    </TreeList>
                )}
            </Droppable>

        )
        
    }


    return (
        <TreeView>
            <DragDropContext onDragEnd={_onDragEnd}>
                { treeParents && <DroppableChildren parent={treeRoot} children={treeParents} index={0} level={1} /> }
            </DragDropContext>        
        </TreeView>
    )


}

FinderViewTree.defaultProps = {
}

export default FinderViewTree