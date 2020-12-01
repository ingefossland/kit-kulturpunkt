import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';
import qs from 'query-string';

import IconButton from "@material-ui/core/IconButton"
import DragIcon from '@material-ui/icons/DragHandle';

import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "../components/ColumnView"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TreeColumn = ({
    documentTree,
    onToggle,
    onSelect,
    onEdit,
    onCreate,
    onDragEnd,
    ...props
}) => {

    const finder = useSelector(state => state.finder)

    const parents = finder.parents
    const menuByUrl = finder.menuByUrl


    const TreeColumn = ({children, index, level, ...parent}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.url} key={parent.url}>
                {(provided, snapshot) => (
                    <ColumnList droppable={{provided, snapshot}}>
                        {children && children.map((child, index) => {

                            const collapsible = child.children && child.children.length
                            const expanded = child.expanded

                            return (
                                <Draggable index={index} draggableId={child.url} key={child.url}>
                                    {(provided, snapshot) => (
                                        <ColumnModule {...child} collapsible={collapsible} index={index} draggable={{provided, snapshot}} level={level} onToggle={() => onToggle(child)}>
                                        { /* expanded && <DocumentTreeChildren {...child} level={level+1} /> */ }
                                        </ColumnModule>
                                    )}
                                </Draggable>
                            )
                        })}
                    </ColumnList>
                )}
            </Droppable>

        )
        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>

            <ColumnView>

            { documentTree && documentTree.map((parent, px) => {

                parent = menuByUrl[parent.url]

                return (
                    <Droppable index={px} droppableId={parent.url} isCombineEnabled={true} key={parent.url}>
                        {(provided, snapshot) => (

                            <ColumnList droppable={{provided, snapshot}} droppableRef={provided.innerRef}>
                        {parent.title}

                                { parent.children && parent.children.map((child, cx) => {
                                    const collapsible = child.children && child.children.length && true
                                    const selected = false

                                    return (
                                        <Draggable index={cx} draggableId={child.url} key={child.url}>
                                            {(provided, snapshot) => (
                                                <ColumnModule {...child} 
                                                    collapsible={collapsible}
//                                                    expanded={selected}
                                                    selected={selected}
                                                    draggable={{provided, snapshot}}
                                                    draggableRef={provided.innerRef}
                                                    onEdit={() => onEdit(child)}
                                                    onSelect={() => onSelect(child)} />
                                            )}
                                        </Draggable>
                                    )
                                })}
                                <button onClick={() => onCreate(parent)}>New child</button>
                            </ColumnList>
                        )}
                    </Droppable>
                )

            })}

            <div>
                {JSON.stringify(documentTree)}
            </div>

            </ColumnView>

        </DragDropContext>    
    )



}

TreeColumn.defaultProps = {
}

export default TreeColumn