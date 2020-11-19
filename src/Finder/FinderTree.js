import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';
import qs from 'query-string';

import {
    DocumentInspector,
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeModule,
} from "../components/DocumentTree/"

import FinderPreview from "./FinderPreview"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FinderTree = (props) => {
    const pathname = props.location.pathname

    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]
    const parents = finder.parents

    const [result, setResult] = useState(undefined)

    const _onEdit = ({url}) => {
        const editUrl = url + "/edit"
        editUrl && props.history.push(editUrl)
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onCreateChild = ({url, id}) => {
        const parentId = Number.isInteger(id) && id || null
        const createUrl = url && url + "/new?" + qs.stringify({documentType: "pageTopic", parentId: parentId})
        createUrl && props.history.push(createUrl)
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
        <DocumentTree>
            <DragDropContext onDragEnd={_onDragEnd}>
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
                                        const hasChildren = menuByUrl[draggableId] && menuByUrl[draggableId].children && menuByUrl[draggableId].children.length && true
                                        const selected = pathname.includes(child.url)

                                        return (
                                            <Draggable index={cx} draggableId={draggableId} key={draggableId}>
                                                {(provided, snapshot) => (
                                                    <DocumentTreeModule {...child} 
                                                        children={hasChildren}
                                                        draggable={{provided, snapshot}}
                                                        draggableRef={provided.innerRef}
                                                        selected={selected}
                                                        onEdit={() => _onEdit(child)}
                                                        onSelect={() => _onSelect(child)} />
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    <button onClick={() => _onCreateChild(parent)}>New child</button>
                                </DocumentTreeColumn>
                            )}
                        </Droppable>
                    )

                })}
            </DragDropContext>        

            <DocumentTreeColumn>
                <FinderPreview model={menuItem} />
            </DocumentTreeColumn>
        </DocumentTree>
    )



}

FinderTree.defaultProps = {
}

export default FinderTree