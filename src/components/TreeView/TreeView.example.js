import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    TreeView,
    TreeList,
    TreeModule,
} from "../TreeView"

const KpTreeChildren = ({sortable, index = 0, size, icons, level = 0, items}) => {

    if (!items) {
        return false
    }

    if (sortable) {

        const droppableId = level + "-" + index

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={droppableId} key={droppableId}>
                {(provided, snapshot) => (
                    <TreeList droppable={{provided, snapshot}}>
                        {items && items.map((item, index) => <KpTreeModule {...item} sortable={sortable} size={size} icons={icons} index={index} level={level} key={index} />)}
                    </TreeList>
                )}
            </Droppable>
        )
    

    }


    return (
        <TreeList>
            {items && items.map((item, index) => <KpTreeModule {...item} size={size} icons={icons} level={level} key={index} />)}
        </TreeList>
    )

}

const KpTreeModule = ({sortable, index = 0, size, icons, children, ...item}) => {

    const { level } = item

    const [expanded, setExpanded] = useState(false)

    const _onToggle = (event) => {
        event.stopPropagation()
        setExpanded(expanded => !expanded)
    }

    const draggableId = level + "-" + index

    if (sortable && children) {
        return (
            <Draggable index={index} draggableId={draggableId} key={draggableId}>
                {(provided, snapshot) => (
                    <TreeModule {...item} draggable={{provided, snapshot}} size={size} icons={icons} collapsible={true} expanded={expanded} onClick={_onToggle}>
                        { expanded && <KpTreeChildren size={size} icons={icons} items={children} level={level+1} /> }
                    </TreeModule>
            )}
            </Draggable>
        )

    }

    if (sortable) {
        return (
            <Draggable index={index} draggableId={draggableId} key={draggableId}>
                {(provided, snapshot) => (
                    <TreeModule {...item} draggable={{provided, snapshot}} size={size} icons={icons}></TreeModule>
                )}
            </Draggable>
        )
    }

    if (children) {
        return (
            <TreeModule {...item} size={size} icons={icons} collapsible={true} expanded={expanded} onClick={_onToggle}>
                { expanded && <KpTreeChildren size={size} icons={icons} items={children} level={level+1} /> }
            </TreeModule>
        )
    }


    return (
        <TreeModule {...item} size={size} icons={icons} onClick={_onToggle}>
        </TreeModule>
    )


}



const KpTreeView = ({sortable = false, size, icons, items}) => {

    const _onDragEnd = (results) => {
        console.log("onDragEnd", results)
    }

    if (sortable) {
        return (
            <TreeView>
                <DragDropContext onDragEnd={_onDragEnd}>
                    <KpTreeChildren sortable={sortable} size={size} icons={icons} items={items} />
                </DragDropContext>
            </TreeView>
        )
    }

    return (
        <TreeView>
            <KpTreeChildren sortable={sortable} size={size} icons={icons} items={items} />
        </TreeView>
    )



}

export default KpTreeView;