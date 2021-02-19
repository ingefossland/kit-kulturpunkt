import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "../components/ColumnView"

import FinderModel from "./FinderModel"

const TreeColumn = ({
    treeRoot,
    treeParent,
    treeParents,
    treeChildren,
    onToggle,
    onSelect,
    onEdit,
    onCreate,
    onDragEnd,
    ...props
}) => {

    const modelsById = useSelector(state => state.modelsById)

    const [parents, setParents] = useState([
        {
            ...treeParent,
            children: treeChildren
        }
    ])

    const _getNodeId = (treeNode) => {
        if (treeNode === treeRoot) {
            return null
        } else {
            return treeNode.replace(treeRoot + "/", "")
        }
    }

    const _getParents = ({url}) => {

        const uniqueId = url && _getNodeId(url)
        const uniqueModel = uniqueId && modelsById && modelsById[uniqueId]

        if (uniqueModel) {

            const modelParents = uniqueModel.parents && uniqueModel.parents.map(parent => {

                const parentModel = modelsById && modelsById[parent.uniqueId]
                const parentChildren = parentModel && parentModel.children
        
                return {
                    ...parent,
                    selected: true,
                    children: parentChildren && parentChildren.map(child => {
                        return {
                            ...child,
                            draggableId: treeRoot + "/" + child.id,
                            droppableId: treeRoot + "/" + child.id,
                            url: treeRoot + "/" + child.uniqueId
                        }
                    }),
                    draggableId: treeRoot + "/" + parent.id,
                    droppableId: treeRoot + "/" + parent.id,
                    url: treeRoot + "/" + parent.uniqueId
                }
            })
    
            setParents([
                treeParent,
                ...modelParents,
                {
                    ...uniqueModel,
                    draggableId: treeRoot + "/" + uniqueModel.id,
                    droppableId: treeRoot + "/" + uniqueModel.id,
                    url: treeRoot + "/" + uniqueModel.uniqueId
                }
            ])

            console.log('treeParents', treeParents)

        } else {
            setParents([
                treeParent
            ])
        }
        
    }

    useEffect(() => {
        setParents([{
            ...treeParent,
            children: treeChildren
        }])
    }, [treeChildren])

    const _onSelect = (model) => {
//        onSelect && onSelect(model)
        _getParents(model)
    }

    const DraggableChild = ({child = {}, level, index}) => {

        child = {
            ...child,
            url: treeRoot + "/" + child.uniqueId,
            draggableId: treeRoot + "/" + child.id,
            droppableId: treeRoot + "/" + child.id
        }

        const uniqueModel = modelsById && modelsById[child.uniqueId]
        const children = uniqueModel && uniqueModel.children

//      const selected = false
        let collapsible = children && true 
        let expanded = false

        child = {
            ...child,
            ...uniqueModel,
            collapsible: collapsible,
        }

        return (
            <Draggable index={index} draggableId={child.draggableId} key={child.draggableId}>
                {(provided, snapshot) => (
                    <FinderModel model={child} onSelect={() => _onSelect(child)}>
                        <ColumnModule {...child} index={index} draggable={{provided, snapshot}} level={level} />
                    </FinderModel>
                )}
            </Draggable>
        )

    }    
    

    const DroppableChildren = ({children, index, level, ...parent}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.droppableId} key={parent.droppableId}>
                {(provided, snapshot) => (
                    <ColumnList droppable={{provided, snapshot}} key={index}>
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
        <DragDropContext onDragEnd={onDragEnd}>
            <ColumnView>
                { parents && parents.map((parent, index) => {
                    return <DroppableChildren {...parent} index={index} level={index+2} key={index} />
                })}
            </ColumnView>
        </DragDropContext>
    )


}

TreeColumn.defaultProps = {
}

export default TreeColumn