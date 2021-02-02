import React, { useEffect, useState } from "react"
import PreviewTemplate from "./PreviewTemplate"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    base: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "block",
        overflowY: "scroll",
        width: "100%",
        height: "100%"
    },
    rows: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 36,
        boxShadow: theme.shadows[4],
        overflow: "hidden",
        transition: ".125s ease-out",

        "&:hover": {
            flexBasis: 96
        },

        "&[aria-expanded=true]": {
            flexGrow: 1,
            flexBasis: "auto",
        },

    },
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
        },

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto",
        },


    }

}));

const PreviewMatrix = ({rows = [], itemsById = {}, onSelect, ...props}) => {

//    const [rows, setRows] = useState([])
    const [rowIndex, setRowIndex] = useState(0)
    const [cols, setCols] = useState([])
    const [colIndex, setColIndex] = useState(0)

    useEffect(() => {
//        const rows = items.filter(item => item.selected)
        const expandCol = rows.find(item => item.expanded) || rows[rows.length-1]
        const rowIndex = rows.indexOf(expandCol)
//        setRows(rows)
        setRowIndex(rowIndex)

        const row = rows && rows[rowIndex]
        const cols = row && [row] || []

        setCols(cols)
        setColIndex(0)

    }, [rows])

    const _onRowIndex = (index) => {
        setRowIndex(index)

        const row = rows && rows[index]
        const cols = row && [row] || []

        setColIndex(0)
        setCols(cols)
    }

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

    const PreviewCols = ({cols = []}) => {

        return (
            <div className={classes.cols}>
                {cols && cols.map((item, index) => <PreviewCol item={item} index={index} key={index} />)}
            </div>
        )
    }

    const PreviewRow = ({cols, item, index}) => {

        const expanded = index == rowIndex

        if (!cols.length) {
            cols = [item]
        }

        if (expanded) {

            return (
                <div className={classes.row} aria-expanded={expanded}>
                    <PreviewCols cols={cols}  />
                </div>            
            )

        } else {

            return (
                <div className={classes.row} aria-expanded={expanded} onClick={() => _onRowIndex(index)}>
                    <PreviewTemplate {...item} />
                </div>            
            )

        }

    }

    return (
        <div className={classes.base}>
            <div className={classes.rows}>
                {rows && rows.map((item, index) => <PreviewRow cols={cols} item={item} index={index} key={index} />)}
            </div>
        </div>
    )

}

export default PreviewMatrix;