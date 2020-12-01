import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TreeList, TreeModule } from "../components"

const DocumentTreeList = ({
    resultsLoaded,
    getChildren,
    onToggle,
    onDragEnd,
    ...props
}) => {

    const pathname = props.location.pathname

    const searchById = useSelector(state => state.searchById)
    const modelsById = useSelector(state => state.modelsById)

    const DraggableChild = ({child, level, index}) => {

        child = {
            ...child,
            ...modelsById[child.uniqueId],
            url: pathname + "/" + child.uniqueId
        }

        const childrenSearch = searchById[child.url]
        const children = childrenSearch && childrenSearch.resultsLoaded

        if (children && children.length) {
            child = {
                ...child,
                collapsible: true,
                expanded: true,
                children: children.map(child => {
                    return {
                        ...child,
                        url: pathname + "/" + child.uniqueId
                    }
                })
            }
        }
        
        !searchById[child.url] && getChildren(child)

//        const collapsible = children && children.length
//        const [expanded, setExpanded] = useState(false)


        return (
            <Draggable index={index} draggableId={child.url} key={child.url}>
                {(provided, snapshot) => (
                    <TreeModule {...child} index={index} draggable={{provided, snapshot}} level={level}>
                    { child.expanded && <DroppableChildren {...child} children={children} level={level+1} /> }
                    </TreeModule>
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

    const parent = resultsLoaded && resultsLoaded.length && {
        url: pathname,
        children: resultsLoaded
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            { parent && <DroppableChildren {...parent} index={1} level={1} /> }
        </DragDropContext>        
    )


}

DocumentTreeList.defaultProps = {
}

export default DocumentTreeList