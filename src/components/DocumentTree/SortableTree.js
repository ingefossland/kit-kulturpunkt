import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeRow,
} from "."

const SortableTree = ({pathname, parents = [], onSelect, onSort}) => {

    const [result, setResult] = useState({})

    let modelsById = {}

    parents.map((parent => {
        const parentId = "parent-" + parent.id

        modelsById[parentId] = {
            id: undefined
        }

        parent.children && parent.children.map((child => {
            const childId = child.id
            modelsById[childId] = child

        }))

    }))

    const _onDragEnd = (result) => {

        const { draggableId, destination, combine } = result

        const childId = draggableId.replace('child-', '')
        const parentId = destination && destination.droppableId.replace('parent-', '') || combine && combine.draggableId.replace('child-', '')
        
        result = {
            parent: modelsById[parentId],
            child: modelsById[childId],
        }

        console.log("DRAG", result)
        setResult(result)

        onSort && onSort(result)


    }

    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <DocumentTree>
                { parents && parents.map((parent, px) => {
                    const parentId = "parent-" + parent.id

                    return (
                        <DocumentTreeColumn droppableId={parentId} key={parentId}>
                            { parent.children && parent.children.map((child, cx) => {
                                const childId = "child-" + child.id
                                const selected = pathname.includes(child.url)
                                return (
                                    <DocumentTreeRow {...child} key={childId} selected={selected} index={cx} draggableId={childId} onSelect={() => onSelect(child)} />
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