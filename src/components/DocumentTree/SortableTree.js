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

        /*

        const { draggableId, source, destination, combine } = result

        const childId = draggableId
        const parentId = destination && destination.droppableId || combine && combine.draggableId

        if (destination && source) {

            modelsById[destination.droppableId].children = [
                ...modelsById[destination.droppableId].children,
                modelsById[draggableId]
            ]

            modelsById[source.droppableId].children.splice(source.index, 1)

        } else if (combine) {

            if (!modelsById[combine.draggableId].children) {
                modelsById[combine.draggableId].children = [draggableId]
            } else {
                modelsById[combine.draggableId].children = [
                    ...modelsById[combine.draggableId].children,
                    modelsById[draggableId]
                ]
            }

            modelsById[source.droppableId].children.splice(source.index, 1)

        }

        const sort = {
            parentId: parentId,
            parent: modelsById[parentId],
            childId: childId,
            child: modelsById[childId],
        }

        console.log("DRAG", result)

        onSort && onSort(sort)

        */


    }

    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <DocumentTree>
                { parents && parents.map((parent, px) => {
                    const { children } = parent;
                    const droppableId = "menu-" + parent.uniqueId

                    return (
                        <DocumentTreeColumn droppableId={droppableId} key={droppableId}>
                            { children && children.map((child, cx) => {
                                const draggableId = "menu-" + child.uniqueId 
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