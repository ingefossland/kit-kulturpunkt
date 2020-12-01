import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FinderModel from "./FinderModel"
import { TreeView, TreeList, TreeModule } from "../components"

const DocumentTreeList = ({
    parent,
    resultsLoaded,
    getChildren,
    onToggle,
    onSelect,
    onDragEnd,
    ...props
}) => {

    const searchByUrl = useSelector(state => state.searchByUrl)
    const modelsById = useSelector(state => state.modelsById)

    const finder = useSelector(state => state.finder)
    const menuByUrl = finder.menuByUrl
    const parents = finder.parents

    const DraggableChild = ({child, level, index}) => {

        child = {
            ...child,
            ...modelsById[child.uniqueId],
            url: parent.url + "/" + child.uniqueId
        }

        !searchByUrl[child.url] && getChildren(child)

        const childrenSearch = searchByUrl[child.url]
        const children = childrenSearch && childrenSearch.resultsLoaded && childrenSearch.resultsLoaded.map(child => {
            return {
                ...child,
                url: parent.url + "/" + child.uniqueId
            }
        })

        let selected = false

        parents.map(parent => {
            if (parent.url && parent.url === child.url) {
                selected = true
            }
        })

        let collapsible, expanded

        if (menuByUrl[child.url]) {
            expanded = menuByUrl[child.url].expanded
        }

        if (children && children.length) {
            collapsible = true
//            expanded = true
        }

        child = {
            ...child,
            selected: selected,
            collapsible: collapsible,
            expanded: selected || expanded,
        }

        return (
            <Draggable index={index} draggableId={child.url} key={child.url}>
                {(provided, snapshot) => (
                    <FinderModel model={child} onSelect={() => onSelect(child)} onToggle={() => onToggle(child)}>
                        <TreeModule {...child} index={index} draggable={{provided, snapshot}} level={level}>
                        { child.expanded && <DroppableChildren {...child} children={children} level={level+1} /> }
                        </TreeModule>
                    </FinderModel>
                )}
            </Draggable>
        )

    }

    const DroppableChildren = ({children, index, level, ...parent}) => {

        return (
            <Droppable isCombineEnabled={true} index={index} droppableId={parent.url} key={parent.url}>
                {(provided, snapshot) => (
                    <TreeList droppable={{provided, snapshot}}>
                        {children && children.map((child, index) => {
                            return (
                                <DraggableChild child={child} level={level} index={index} />
                            )
                        })}
                    </TreeList>
                )}
            </Droppable>

        )
        
    }

    return (
        <TreeView>
            <DragDropContext onDragEnd={onDragEnd}>
                { parent && <DroppableChildren {...parent} index={0} level={1} /> }
            </DragDropContext>        
        </TreeView>
    )


}

DocumentTreeList.defaultProps = {
}

export default DocumentTreeList