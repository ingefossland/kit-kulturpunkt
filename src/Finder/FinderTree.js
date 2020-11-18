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

    const menuTree = finder.menuTree
    const menuTreeById = finder.menuTreeById

    const [result, setResult] = useState(menuTree)

    useEffect(() => {
        dispatch(getFinderTree({pathname}))
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