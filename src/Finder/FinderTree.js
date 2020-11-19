import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeRow,
} from "../components/DocumentTree/"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FinderTree = (props) => {
    const pathname = props.location.pathname

    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const parents = finder.parents

    const [result, setResult] = useState(undefined)

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onDragEnd = (results) => {

        const { draggableId, source, destination, combine } = results

        if (source && destination && 
            source.droppableId !== destination.droppableId &&
            draggableId !== destination.droppableId) {

            dispatch(sortMenuTree({
                destination: {
                    ...menuByUrl[destination.droppableId],
                    ...destination,
                },
                source: {
                    ...menuByUrl[source.droppableId],
                    ...source,
                },
                item: menuByUrl[draggableId]
            }))

        } else if (combine) {

            dispatch(sortMenuTree({
                destination: {
                    ...menuByUrl[combine.draggableId],
                    ...destination,
                },
                source: {
                    ...menuByUrl[source.droppableId],
                    ...source,
                },
                item: menuByUrl[draggableId]
            }))            

        }

        setResult({results})

       
    }
    
    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <DocumentTree>
                { parents && parents.map((parent, px) => {
                    const droppableId = parent.url

                    const droppableParent = {
                        ...menuByUrl[droppableId],
                    }

                    return (
                        <Droppable index={px} droppableId={droppableId} isCombineEnabled={true} key={droppableId}>
                            {(provided, snapshot) => (
                                <DocumentTreeColumn droppable={{provided, snapshot}} droppableRef={provided.innerRef}>
                                    { droppableParent.children && droppableParent.children.map((child, cx) => {
                                        const draggableId = child.url
                                        const hasChildren = menuByUrl[draggableId].children && menuByUrl[draggableId].children.length && true
                                        const selected = pathname.includes(child.url)

                                        return (
                                            <Draggable index={cx} draggableId={draggableId} key={draggableId}>
                                                {(provided, snapshot) => (
                                                    <DocumentTreeRow {...child} children={hasChildren} draggable={{provided, snapshot}} draggableRef={provided.innerRef} selected={selected} onSelect={() => _onSelect(child)} />
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