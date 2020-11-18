import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, getParents } from '../redux/finder';
import { getModel, saveModel } from '../redux/modelsById';

import SortableTree from "../components/DocumentTree/SortableTree"

const FinderTree = ({item = {}, layout = "list", ...props}) => {
    const dispatch = useDispatch()

    const pathname = props.location.pathname

    const finder = useSelector(state => state.finder)
    const menuById = finder.menuById;
    const parents = finder.parents
    


    let sortableTree = {}

    parents.map((parent => {
        const parentId = "drop-" + parent.uniqueId

        parent.children && parent.children.map((child => {
            const childId = "drag-" + child.uniqueId
            sortableTree[childId] = child
        }))

        sortableTree[parentId] = parent

    }))


    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onSort = (result) => {

        const { draggableId, source, destination, combine } = result

        const uniqueId = draggableId.replace("drag-", "")
        const parentId = destination && destination.droppableId.replace("drop-", "") || combine && combine.draggableId.replace("drag-", "")

        const parent = parentId && menuById && menuById[parentId]
        const child = uniqueId && menuById && menuById[uniqueId]

        if (parent && child) {
            child.id && parent.id && dispatch(saveModel({id: child.id, parentId: parent.id}))
        }

        if (source && destination) {
            const sourceId = source && source.droppableId.replace("drop-", "")
            const destinationId = destination && destination.droppableId.replace("drop-", "")

            /*
            sortableTree[destination.droppableId].children = [
                ...sortableTree[destination.droppableId].children,
                sortableTree[draggableId]
            ]

            sortableTree[source.droppableId].children.splice(source.index, 1)
            */

            const destinationUrl = menuById && menuById[destinationId] && menuById[destinationId].url
            destinationUrl && props.history.push(destinationUrl)


        } else if (combine) {

            const combineId = combine && combine.draggableId.replace("drag-", "")
            const combineUrl = menuById && menuById[combineId] && menuById[combineId].url

            combineUrl && props.history.push(combineUrl)

        }

    }

    return <div>

        <SortableTree pathname={pathname} parents={parents} onSelect={_onSelect} onSort={_onSort} />
        </div>
}

FinderTree.defaultProps = {
}

export default FinderTree