import React, { useEffect, useState } from 'react';

import IconButton from "@material-ui/core/IconButton"

import { ListModule } from "../components"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TreeList, TreeItem, TreeModule } from "../components"

const TreeViewList = ({
    documentTree,
    onToggle,
    onDragEnd
}) => {

    const renderParent = ({children, index, level, ...parent}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.url} key={parent.url}>
                {(provided, snapshot) => (
                    <TreeList droppable={{provided, snapshot}}>
                        {children && children.map((child, index) => {

                            const collapsible = child.children && child.children.length
                            const expanded = child.expanded

                            return (
                                <Draggable index={index} draggableId={child.url} key={child.url}>
                                    {(provided, snapshot) => (
                                        <TreeItem {...child} collapsible={collapsible} index={index} draggable={{provided, snapshot}} level={level} onToggle={() => onToggle(child)}>
                                        {expanded && renderParent({...child, level: level+1})}
                                        </TreeItem>
                                    )}
                                </Draggable>
                            )
                        })}
                    </TreeList>
                )}
            </Droppable>

        )
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {documentTree && documentTree.map((parent, index) => {
                return renderParent({...parent, index, level: 1})
            })}
        </DragDropContext>        
    )



}

TreeViewList.defaultProps = {
}

export default TreeViewList