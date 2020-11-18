import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItem, getParents } from '../redux/finder';
import { saveModel } from '../redux/modelsById';

import SortableTree from "../components/DocumentTree/SortableTree"

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeRow,
} from "../components/DocumentTree/"


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FinderTree = ({menuItem = {}, ...props}) => {
    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)

    const parents = finder.parents
    const menuByUrl = finder.menuByUrl

    const pathname = props.location.pathname
    
    const [menuTree, setMenuTree] = useState([])
    const [menuTreeById, setMenuTreeById] = useState({})
    const [result, setResult] = useState(parents)


    useEffect(() => {

        const menuTree = parents.map(parent => {

            const droppableId = "drop-" + parent.id

            parent = {
                ...parent,
                droppableId: droppableId,
                children: parent.children && parent.children.map(child => {
                    return {
                        ...child,
                        draggableId: "drag-" + child.id
                    }
                }) 
            }

            return parent
        })

        let menuTreeById = {}

        menuTree.map(parent => {
            menuTreeById[parent.droppableId] = parent

            parent.children && parent.children.map(child => {
                menuTreeById[child.draggableId] = child
            })
        })

        setMenuTree(menuTree)
        setMenuTreeById(menuTreeById)

    }, [parents])

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onDragEnd = (result) => {

        setResult(result)

        const { draggableId, source, destination, combine } = result

        if (source && destination && source.droppableId !== destination.droppableId) {

            menuTreeById[destination.droppableId].children = [
                ...menuTreeById[destination.droppableId].children,
                menuTreeById[source.droppableId].children[source.index]
            ]

            menuTreeById[source.droppableId].children.splice(source.index, 1)

            const parentId = menuTreeById[destination.droppableId].id || null
            const id = menuTreeById[draggableId].id

            if (id && parentId) {
                dispatch(saveModel({id, parentId}))
            } else if (id) {
                dispatch(saveModel({id, parentId: null}))
            }

            const destinationUrl = menuTreeById[destination.droppableId].url
            destinationUrl && props.history.push(destinationUrl)


            
        } else if (combine) {

            if (!menuTreeById[combine.draggableId].children) {
                menuTreeById[combine.draggableId].children = [menuTreeById[draggableId]]
            } else {
                menuTreeById[combine.draggableId].children = [
                    ...menuTreeById[combine.draggableId].children,
                    menuTreeById[draggableId]
                ]
            }

            menuTreeById[source.droppableId].children.splice(source.index, 1)

            const parentId = menuTreeById[combine.draggableId].id
            const id = menuTreeById[draggableId].id

            if (id && parentId) {
                dispatch(saveModel({id, parentId}))
            }

            const selectUrl = menuTreeById[combine.draggableId].parentUrl
            selectUrl && props.history.push(selectUrl)
            

        }

    }

    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <DocumentTree>
                { menuTree && menuTree.map((parent, px) => {
                    const { droppableId } = parent;

                    const { children } = menuTreeById[droppableId]

                    return (
                        <DocumentTreeColumn droppableId={droppableId} key={droppableId}>
                            { children && children.map((child, cx) => {
                                const { draggableId } = child 
                                const selected = pathname.includes(child.url)
                                return (
                                    <DocumentTreeRow {...child} key={draggableId} selected={selected} index={cx} draggableId={draggableId} onSelect={() => _onSelect(child)} />
                                )
                            })}
                        </DocumentTreeColumn>
                    )

                })}

                <DocumentTreeColumn>
                    {JSON.stringify(result)}
                </DocumentTreeColumn>
            </DocumentTree>
        </DragDropContext>        
    )

}

FinderTree.defaultProps = {
}

export default FinderTree