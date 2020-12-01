import React, { useEffect, useState } from 'react';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TreeList, TreeModule } from "../components"

const DocumentTreeList = ({
    documentTree,
    onToggle,
    onDragEnd
}) => {

    const DocumentTreeChildren = ({children, index, level, ...parent}) => {

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
                                        <TreeModule {...child} collapsible={collapsible} index={index} draggable={{provided, snapshot}} level={level} onToggle={() => onToggle(child)}>
                                        { expanded && <DocumentTreeChildren {...child} level={level+1} /> }
                                        </TreeModule>
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
            {documentTree && documentTree.map((parent, index) => (<DocumentTreeChildren {...parent} index={index} level={1} />))}
        </DragDropContext>        
    )



}

DocumentTreeList.defaultProps = {
}

export default DocumentTreeList