import React, { useState } from "react"

import {
    TreeView,
    TreeList,
    TreeModule,
} from "../TreeView"

const KpTreeChildren = ({size, icons, level = 0, items}) => {

    if (!items) {
        return false
    }

    return (
        <TreeList>
            {items && items.map((item, index) => <KpTreeModule {...item} size={size} icons={icons} level={level} key={index} />)}
        </TreeList>
    )

}

const KpTreeModule = ({size, icons, children, ...item}) => {

    const { level } = item

    const [expanded, setExpanded] = useState(false)

    const _onToggle = (event) => {
        event.stopPropagation()
        setExpanded(expanded => !expanded)
    }

    if (children) {
        return (
            <TreeModule {...item} size={size} icons={icons} collapsible={true} expanded={expanded} onClick={_onToggle}>
                { expanded && <KpTreeChildren size={size} icons={icons} items={children} level={level+1} /> }
            </TreeModule>
        )

    }

    return (
        <TreeModule {...item} size={size} icons={icons}></TreeModule>
    )


}



const KpTreeView = ({size, icons, items}) => {


    return (
        <TreeView>
            <KpTreeChildren size={size} icons={icons} items={items} />
        </TreeView>
    )


}

export default KpTreeView;