import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFinderTree, getMenuItem, getParents } from '../redux/finder';
import { saveModel } from '../redux/modelsById';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeRow,
} from "../components/DocumentTree/"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FinderTree = (props) => {
    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)

    const pathname = props.location.pathname
//    const parents = finder.parents
//    const menuByUrl = finder.menuByUrl
//    const menuById = finder.menuById

//    const [menuTree, setMenuTree] = useState([])
//    const [menuTreeById, setMenuTreeById] = useState({})

    let menuTree = finder.menuTree
    let menuTreeById = finder.menuTreeById

    const [result, setResult] = useState(menuTree)

    useEffect(() => {

        dispatch(getFinderTree({pathname}))

        /*

        const menuTree = parents.map(parent => {
            const { id, uniqueId, url } = parent
            const droppableId = "drop-" + id

            if (uniqueId && menuById[uniqueId]) {
                parent = {
                    ...menuById[uniqueId],
                    droppableId: droppableId
                }
            } else if (url && menuByUrl[url]) {
                parent = {
                    ...menuByUrl[url],
                    droppableId: "drop-" + url
                }
            }

            const children = parent.children && parent.children.map(child => {
                const { id, uniqueId, url } = child
                const draggableId = "drag-" + id

                if (uniqueId && menuById[uniqueId]) {
                    return {
                        ...menuById[uniqueId],
                        draggableId: draggableId,
                    }
                } else if (url && menuByUrl[url]) {
                    return {
                        ...menuByUrl[url],
                        droppableId: "drag-" + url
                    }
                }
    
            }) 

            if (children && children.length) {
                return {
                    ...parent,
                    children: children
                }
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

        */

    }, [pathname])

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onDragEnd = (result) => {

        setResult(result)

        const { draggableId, source, destination, combine } = result

        if (source && destination && source.droppableId !== destination.droppableId) {

            /*

            menuTreeById[destination.droppableId].children = [
                ...menuTreeById[destination.droppableId].children,
                menuTreeById[source.droppableId].children[source.index]
            ]

            menuTreeById[source.droppableId].children.splice(source.index, 1)

            */



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

            /*

            if (!menuTreeById[combine.draggableId].children) {
                menuTreeById[combine.draggableId].children = [menuTreeById[draggableId]]
            } else {
                menuTreeById[combine.draggableId].children = [
                    ...menuTreeById[combine.draggableId].children,
                    menuTreeById[draggableId]
                ]
            }

            menuTreeById[source.droppableId].children.splice(source.index, 1)

            */


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
                    const { children, droppableId } = parent;

                    return (
                        <Droppable index={px} droppableId={droppableId} isCombineEnabled={true} key={droppableId}>
                            {(provided, snapshot) => (
                                <DocumentTreeColumn droppable={{provided, snapshot}} droppableRef={provided.innerRef}>
                                    { children && children.map((child, cx) => {
                                        const { uniqueId, draggableId } = child 
                                        const selected = pathname.includes(child.url)
                                        return (
                                            <Draggable index={cx} draggableId={draggableId} key={draggableId}>
                                                {(provided, snapshot) => (
                                                    <DocumentTreeRow {...child} draggable={{provided, snapshot}} draggableRef={provided.innerRef} selected={selected} onSelect={() => _onSelect(child)} />
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </DocumentTreeColumn>
                            )}
                        </Droppable>
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