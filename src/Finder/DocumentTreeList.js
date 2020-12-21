import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TreeView, TreeList, TreeModule } from "../components"

import FinderModel from "./FinderModel"

const DocumentTreeList = ({
    treeRoot,
    treeParent,
    treeChildren,
    onToggle,
    onSelect,
    onDragEnd,
    ...props
}) => {

    const modelsById = useSelector(state => state.modelsById)

    const _onSelect = ({url}) => {
        onSelect && onSelect({url})
    }

    const _onToggle = () => {
        
    }

    const DraggableChild = ({child, level, index}) => {

        child = {
            ...child,
            draggableId: treeRoot + "/" + child.id,
            droppableId: treeRoot + "/" + child.id,
            url: treeRoot + "/" + child.uniqueId
        }

        const uniqueModel = modelsById && modelsById[child.uniqueId]
        const children = uniqueModel && uniqueModel.children

        let selected = props.location.pathname === child.url
        let collapsible = true, expanded = true

        child = {
            ...child,
            selected: selected,
            collapsible: collapsible,
            expanded: selected || expanded,
        }

        const renderChildren = () => {

            if (!children) {
                return false
            }

            return (
                <DroppableChildren parent={child} children={children} level={level+1} />
            )

        }

        return (
            <Draggable index={index} draggableId={child.draggableId} key={child.draggableId}>
                {(provided, snapshot) => (
                    <FinderModel {...props} model={child} onSelect={() => _onSelect(child)} onToggle={() => _onToggle(child)}>
                        <TreeModule {...child} index={index} draggable={{provided, snapshot}} level={level} renderChildren={renderChildren} />
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
                                <DraggableChild child={child} level={level} index={index} />
                            )
                        })}
                    </TreeList>
                )}
            </Droppable>

        )
        
    }

    return (
        <TreeView>
            <DragDropContext onDragEnd={onDragEnd}>
                { treeParent && treeChildren && <DroppableChildren parent={treeParent} children={treeChildren} index={0} level={1} /> }
            </DragDropContext>        
        </TreeView>
    )


}

DocumentTreeList.defaultProps = {
}

export default DocumentTreeList