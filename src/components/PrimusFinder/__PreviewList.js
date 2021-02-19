import React, { useEffect, useState } from "react"
import ObjectPreview from "./ObjectPreview"

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
    },
    list: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        zIndex: 1,
        flexGrow: 0,
        height: 36,
        boxShadow: theme.shadows[4],
        overflow: "hidden",
        transition: ".125s ease-out",

        "&:hover": {
            height: 96
        },

        "&[aria-expanded=true]": {
            zIndex: 2,
            flexGrow: 1,
            height: "auto",
            minHeight: "100%"
        },

    },
    col: {
        zIndex: 1,
        flexGrow: 0,
        width: 36,
        minHeight: "100%",
        height: "100%",
        boxShadow: theme.shadows[4],
        overflow: "hidden",
        transition: ".125s ease-out",

        "&:hover": {
            width: 96
        },

        "&[aria-expanded=true]": {
            zIndex: 2,
            flexGrow: 1,
            width: "auto"
        },

    }

}));

const PreviewRowX = (props) => {

    const classes = useStyles()

    const [items, setItems] = useState(props.items)

//    const expandItem = items.find(item => item.expanded) || items[items.length-1]
    const [rowIndex, setRowIndex] = useState(0)

    const _onExpandIndex = (index) => {
        setRowIndex(index)
    }

    const _onSelect = (item) => {

        const newItems = [
            ...items,
            item
        ]

        setRowIndex(2)

        setItems(newItems)
    }

    const RowItem = ({item, index}) => {
        return (
            <div className={classes.col} aria-expanded={index === rowIndex} onClick={() => _onExpandIndex(index)}>
                <ObjectPreview {...item} onSelect={_onSelect} />
                {rowIndex}
            </div>            
        )

    }

    return (
        <div className={classes.row}>
            {items && items.map((item, index) => <RowItem item={item} index={index} key={index} />)}
        </div>
    )

}


const PreviewList = ({items = [], onSelect, ...props}) => {

    const classes = useStyles()

    const expandItem = items.find(item => item.expanded) || items[items.length-1]

    const [rowIndex, setRowIndex] = useState(items.indexOf(expandItem))

    useEffect(() => {

        const expandItem = items.find(item => item.expanded) || items[items.length-1]
        setRowIndex(items.indexOf(expandItem))

    }, [items])

    const _onExpandRow = (index) => {
        setRowIndex(index)
    }

    const [cols, setCols] = useState(null)
    const [colIndex, setColIndex] = useState(0)

    const _onExpandCol = (index) => {
        setColIndex(index)
    }

    const _onSelect = (item) => {

        if (cols) {
            setCols([
                ...cols,
                item
            ])
        } else {
            setCols([item])
        }

    }

    const PreviewCol = ({item, index}) => {
        return (
            <div className={classes.col} aria-expanded={index === colIndex} onClick={() => _onExpandCol(index)}>
                <ObjectPreview {...item} onSelect={_onSelect} />
            </div>            
        )
    }

    const PreviewRow = ({item, index}) => {

        const items = cols && [item, ...cols] || [item]

        return (
            <div className={classes.row} aria-expanded={index === rowIndex} onClick={() => _onExpandRow(index)}>
                <ObjectPreview {...item} onSelect={_onSelect} />

                { cols && cols.map((item, index) => <PreviewCol item={item} index={index} key={index} />)}

            </div>            
        )
    }

    return (
        <div className={classes.base}>
            <div className={classes.list}>
                {items && items.map((item, index) => <PreviewRow item={item} index={index} key={index} />)}
            </div>
        </div>
    )

}

export default PreviewList;