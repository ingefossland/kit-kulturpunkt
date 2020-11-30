import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';
import qs from 'query-string';

import IconButton from "@material-ui/core/IconButton"
import DragIcon from '@material-ui/icons/DragHandle';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeModule,
} from "../components/DocumentTree"

import FinderLayout from "./FinderLayout"
import FinderPreview from "./FinderPreview"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FinderTree = (props) => {
    const pathname = props.location.pathname

    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]
    const parents = finder.parents
    const parentsByUrl = finder.parentsByUrl

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

    const DragHandle = ({dragHandleProps}) => {

        return (
            <IconButton {...dragHandleProps} >
                <DragIcon />
            </IconButton>
        )
    
    }

    const renderChildren = ({children}) => {

        return (
            <ul>
                {children && children.map((child, index) => {

                    const treeChild = {
                        ...menuByUrl[child.url]
                    }

                    return (
                        <Draggable index={index} draggableId={child.url} key={child.url}>
                        {(provided, snapshot) => (
                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                {treeChild.title}
                                {treeChild.children && renderChildren(treeChild)}
                            </li>
                        )}
                        </Draggable>
                    )
                })}
            </ul>
        )
        
    }

    return (
        <DragDropContext onDragEnd={_onDragEnd}>
            <ul>
                {parents && parents.map((parent, index) => {
                    const treeParent = {
                        ...menuByUrl[parent.url]
                    }
                    return (
                        <Droppable isCombineEnabled={true} index={index} droppableId={parent.url} key={parent.url}>
                        {(provided, snapshot) => (
                            <li {...provided.droppableProps} ref={provided.innerRef}>
                                {treeParent.title}
                                {treeParent.children && renderChildren(treeParent)}
                            </li>
                        )}
                        </Droppable>
                    )
                })}
            </ul>
        </DragDropContext>        
    )
    
    return (
        <FinderLayout {...finder}>
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
                                            const expanded = parentsByUrl[child.url] && true
                                            const selected = pathname == child.url

                                            return (
                                                <Draggable index={cx} draggableId={draggableId} key={draggableId}>
                                                    {(provided, snapshot) => (
                                                        <DocumentTreeModule {...child} 
                                                            children={hasChildren}
                                                            draggable={{provided, snapshot}}
                                                            draggableRef={provided.innerRef}
                                                            expanded={expanded}
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
        </FinderLayout>
    )



}

FinderTree.defaultProps = {
}

export default FinderTree