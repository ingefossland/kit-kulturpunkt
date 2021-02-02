import React, { useEffect, useState } from "react"
import PreviewTemplate from "./PreviewTemplate"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cols: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },
    col: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 96,
        boxShadow: theme.shadows[4],
        overflow: "hidden",
        transition: ".125s ease-out",

        "&:hover": {
            flexBasis: 96 * 2
        },

        "& > *": {
            minHeight: "100%",
        },

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto",
        },

    }

}));

const PreviewCols = ({items = [], itemsById = {}, onSelect, ...props}) => {

    const [cols, setCols] = useState(items)
    const [colIndex, setColIndex] = useState(items.length && items.length-1)

    const _onColIndex = (index) => {
        setColIndex(index)
    }

    const _onExpandCol = (parents, child) => {

        const cols = [
            ...parents,
            child
        ]

        setCols([
            ...parents,
            child
        ])

        setColIndex(cols.length-1)

        onSelect && onSelect(child)

    }

    const classes = useStyles()

    const PreviewCol = ({item, index}) => {

        const expanded = index == colIndex
        const parents = cols.filter((parent, i) => i <= index)

        return (
            <div className={classes.col} aria-expanded={expanded} onClick={() => _onColIndex(index)}>
                <PreviewTemplate {...item} expanded={expanded} onSelect={(child) => _onExpandCol(parents, child)} />
            </div>            
        )
    }

    return (
        <div className={classes.cols}>
            {cols && cols.map((item, index) => <PreviewCol item={item} index={index} key={index} />)}
        </div>
    )


}

export default PreviewCols;