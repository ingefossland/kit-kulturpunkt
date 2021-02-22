import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "../components/ColumnView"
import { getTree, dragNode, selectNode, toggleNode, expandNode } from '../redux/tree';
import { useHistory, useLocation } from "react-router-dom";

import FinderModel from "./FinderModel"

const TreeColumn = ({
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

    const { treeRoot, treeColumns, nodesById } = useSelector(state => state.tree)

    const _onToggle = (event, node) => {
        event.stopPropagation()
        dispatch(toggleNode(node))
    }

    const _onDragEnd = (results) => {
        dispatch(dragNode({results, url}))
    }

    const DraggableChild = ({child = {}, level, index}) => {

        child = {
            ...child,
            level: level,
            draggableId: url + "/" + child.id,
            droppableId: url + "/" + child.id,
            url: url + "/" + child.uniqueId
        }

        const uniqueModel = modelsById && modelsById[child.uniqueId]
        const uniqueNode = nodesById && nodesById[child.uniqueId]

        const children = uniqueModel && uniqueModel.children || []
        const collapsible = children.length && true

        child = {
            ...child,
//            ...uniqueModel,
            ...uniqueNode,
            children: children,
            collapsible: collapsible,
        }

        return (
            <Draggable index={index} draggableId={child.draggableId} key={child.draggableId}>
                {(provided, snapshot) => (
                    <FinderModel {...child}
                            index={index}
                            level={level}
                            draggable={{provided, snapshot}} 
                            getChildren={true}>
                        <ColumnModule onClick={(event) => _onToggle(event, child)} />
                    </FinderModel>
                )}
            </Draggable>
        )

    }    
    

    const DroppableColumn = ({parent, children, level, index}) => {

        if (!children) {
            return false
        }

        return (
            <>
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.droppableId} key={parent.droppableId}>
                {(provided, snapshot) => (
                    <ColumnList elevation={level} droppable={{provided, snapshot}} key={index}>
                        {children && children.map((child, index) => {
                            return (
                                <DraggableChild child={child} level={level} index={index} key={index} />
                            )
                        })}
                    </ColumnList>
                )}
            </Droppable>
            </>
        )
        
    }

    return (
        <ColumnView>
            <DragDropContext onDragEnd={_onDragEnd}>
                { treeColumns && treeColumns.map((column, index) => {
                    return (
                        <DroppableColumn {...column} level={index} key={index} />
                    )
                })}
            </DragDropContext>
        </ColumnView>
    )


}

TreeColumn.defaultProps = {
}

export default TreeColumn