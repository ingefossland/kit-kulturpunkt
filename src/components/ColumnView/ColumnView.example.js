import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "./"

const ColumnViewExample = ({sortable, size, icons = [], items}) => {

    const [columns, setColumns] = useState([
        {
            expanded: true,
            children: items
        }]
    )

    const _onToggle = ({children, level, index}) => {

        let parents = []

        columns.map((parent, i) => {
            if (i <= level) {

                parent.children = parent.children.map((item, j) => {
                    return {
                        ...item,
                        expanded: j === index
                    }
                })

                parents.push(parent)
            }
        })

        if (children) {
            setColumns([
                ...parents,
                {
                    children: children
                }
            ])

        }


    }

    const _renderModule = (item) => {

        const { level, index, children } = item

        const draggableId = "drag-" + level + "-" + index

        if (sortable) {
            return (
                <Draggable index={index} draggableId={draggableId} key={draggableId}>
                    {(provided, snapshot) => (
                        <ColumnModule {...item} draggable={{provided, snapshot}} size={size} icons={icons} editable={true} collapsible={children && true} onClick={() => _onToggle(item)}></ColumnModule>
                    )}
                </Draggable>
            )
        }

        return (
            <ColumnModule {...item} size={size} icons={icons} editable={true} collapsible={children && true} onClick={() => _onToggle(item)} />
        )

    }

    const _renderColumn = ({index, level = 0, children}) => {

        if (!children) {
            return false
        }

        const droppableId = "drop-" + level

        if (sortable) {
            return (
                <Droppable isCombineEnabled={true} index={index} droppableId={droppableId} key={droppableId}>
                    {(provided, snapshot) => (
                        <ColumnList droppable={{provided, snapshot}} elevation={level}>
                            {children && children.map((item, index) => _renderModule({...item, level, index}))}
                        </ColumnList>
                    )}
                </Droppable>
            )
        }

        return (
            <ColumnList elevation={level}>
                {children && children.map((item, index) => _renderModule({...item, level, index}))}
            </ColumnList>
        )
    
    }

    const _onDragEnd = (results) => {
        console.log("onDragEnd", results)
    }

    if (sortable) {
        return (
            <ColumnView>
                <DragDropContext onDragEnd={_onDragEnd}>
                    {columns.map((parent, index) => _renderColumn({...parent, index: index, level: index}))}
                </DragDropContext>
            </ColumnView>
        )
    }

    return (
        <ColumnView>
            {columns.map((parent, index) => _renderColumn({...parent, index: index, level: index}))}
        </ColumnView>
    )

}

export default ColumnViewExample;