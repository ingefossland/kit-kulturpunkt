import React, { useState } from "react"

import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "./"

const ColumnViewExample = ({items}) => {

    const [columns, setColumns] = useState([
        {
            expanded: true,
            children: items
        }]
    )

    const _onToggle = ({children, level, index}) => {

        let parents = []

        columns.map((parent, i) => {
            if (i <= level) {

                parent.children = parent.children.map((item, j) => {
                    return {
                        ...item,
                        expanded: j === index
                    }
                })

                parents.push(parent)
            }
        })

        if (children) {
            setColumns([
                ...parents,
                {
                    children: children
                }
            ])

        }


    }

    const _renderModule = (item) => {

        const { level, children } = item

        return (
            <ColumnModule {...item} editable={true} collapsible={children && true} onClick={() => _onToggle(item)} />
        )

    }

    const _renderColumn = ({level = 0, children}) => {

        if (!children) {
            return false
        }

        return (
            <ColumnList elevation={level}>
                {children && children.map((item, index) => _renderModule({...item, level, index}))}
            </ColumnList>
        )
    
    }

    return (
        <ColumnView>
            {columns.map((parent, index) => _renderColumn({...parent, level: index}))}
        </ColumnView>
    )

}

export default ColumnViewExample;