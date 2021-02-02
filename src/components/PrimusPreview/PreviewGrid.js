import React, { useEffect, useState } from "react"
import PreviewTemplate from "./PreviewTemplate"
import PreviewCols from "./PreviewCols"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    rows: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "scroll"
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
}));

const PreviewGrid = ({items = [], itemsById = {}, onSelect, ...props}) => {

    const [rows, setRows] = useState(items)
    const [rowIndex, setRowIndex] = useState(items.length && items.length-1)

    useEffect(() => {
        setRows(items)
        setRowIndex(items.length && items.length-1)
    }, [items])

    const _onRowIndex = (index) => {
        setRowIndex(index)
    }

    const classes = useStyles()

    const PreviewRow = ({item, index}) => {

        const expanded = index == rowIndex

        if (expanded) {

            return (
                <div className={classes.row} aria-expanded={expanded}>
                    <PreviewCols items={[item]}  />
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
        <div className={classes.rows}>
            {rows && rows.map((item, index) => <PreviewRow item={item} index={index} key={index} />)}
        </div>
    )

}

export default PreviewGrid;