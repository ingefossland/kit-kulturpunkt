import React, { useState } from "react"

import {
    TreeView,
    TreeList,
    TreeModule,
} from "../TreeView"

import icons from "../KpIcons"

const KpTreeChildren = ({level = 0, items}) => {

    if (!items) {
        return false
    }

    return (
        <TreeList>
            {items && items.map((item, index) => <KpTreeModule {...item} level={level} key={index} />)}
        </TreeList>
    )

}

const KpTreeModule = ({children, ...item}) => {

    const _getIcon = ({documentType, mediaType}) => {
        return documentType && icons[documentType]
    }

    const { level } = item

    const [expanded, setExpanded] = useState(false)

    const _onToggle = (event) => {
        event.stopPropagation()
        setExpanded(expanded => !expanded)
    }

    if (children) {
        return (
            <TreeModule {...item} collapsible={true} expanded={expanded} icon={_getIcon(item)} onClick={_onToggle}>
                { expanded && <KpTreeChildren items={children} level={level+1} /> }
            </TreeModule>
        )

    }

    return (
        <TreeModule {...item} icon={_getIcon(item)}></TreeModule>
    )


}



const KpTreeView = ({items}) => {


    return (
        <TreeView>
            <KpTreeChildren items={items} />
        </TreeView>
    )


}

export default KpTreeView;