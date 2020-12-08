import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FinderModel from "./FinderModel"

import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "../components/ColumnView"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TreeColumn = ({
    resultsLoaded,
    parent,
    getChildren,
    onToggle,
    onSelect,
    onEdit,
    onCreate,
    onDragEnd,
    ...props
}) => {

    const searchByUrl = useSelector(state => state.searchByUrl)
    const modelsById = useSelector(state => state.modelsById)

    const finder = useSelector(state => state.finder)
    const parents = finder.parents

    const DraggableChild = ({child = {}, level, index}) => {

        !searchByUrl[child.url] && getChildren(child)

        const currentSearch = searchByUrl[child.url]
        const children = currentSearch && currentSearch.resultsLoaded && currentSearch.resultsLoaded

        let selected = false

        parents.map(parent => {
            if (parent.url && parent.url === child.url) {
                selected = true
            }
        })

        let collapsible = false

        if (children && children.length) {
            collapsible = true
        }

        child = {
            ...child,
            selected: selected,
            collapsible: collapsible,
        }

        return (
            <Draggable index={index} draggableId={child.url} key={child.url}>
                {(provided, snapshot) => (
                    <FinderModel model={child} onSelect={() => onSelect(child)}>
                        <ColumnModule {...child} index={index} draggable={{provided, snapshot}} level={level}>
                        </ColumnModule>
                    </FinderModel>
                )}
            </Draggable>
        )

    }    
    

    const DroppableChildren = ({children, index, level, ...parent}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.url} key={parent.url}>
                {(provided, snapshot) => (
                    <ColumnList droppable={{provided, snapshot}}>
                        {children && children.map((child, index) => {
                            return (
                                <DraggableChild child={child} level={level} index={index} key={index} />
                            )
                        })}
                    </ColumnList>
                )}
            </Droppable>

        )
        
    }

    return (
        <ColumnView>
            <DragDropContext onDragEnd={onDragEnd}>
                { parents && parents.map((parent, index) => {
                    return <DroppableChildren {...parent} index={index} level={index+2} />
                })}
            </DragDropContext>
        </ColumnView>
    )




}

TreeColumn.defaultProps = {
}

export default TreeColumn