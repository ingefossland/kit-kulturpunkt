import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeRow,
} from "."

const SortableTree = ({pathname, parents = [], onSelect, onSort}) => {

    const [result, setResult] = useState({})

    const _onDragEnd = (result) => {
        setResult(result)

        onSort && onSort(result)
    }

    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <DocumentTree>
                { parents && parents.map((parent, px) => {
                    const { children } = parent;
                    const droppableId = "drop-" + parent.uniqueId

                    return (
                        <DocumentTreeColumn droppableId={droppableId} key={droppableId}>
                            { children && children.map((child, cx) => {
                                const draggableId = "drag-" + child.uniqueId 
                                const selected = pathname.includes(child.url)
                                return (
                                    <DocumentTreeRow {...child} key={draggableId} selected={selected} index={cx} draggableId={draggableId} onSelect={() => onSelect(child)} />
                                )
                            })}
                        </DocumentTreeColumn>
                    )

                })}

                <DocumentTreeColumn>
                    {JSON.stringify(result, 0, 2)}
                </DocumentTreeColumn>
            </DocumentTree>
        </DragDropContext>
    )

}

export default SortableTree