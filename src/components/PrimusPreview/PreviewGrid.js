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
        position: "relative",
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 36,
        boxShadow: theme.shadows[4],
        overflow: "hidden",
        transition: ".125s ease-out",

        "&:hover": {
            flexBasis: 96,

            "& > $header": {
                display: "none"
            }

        },

        "&[aria-expanded=true]": {
            flexGrow: 1,
            flexBasis: "auto",
        },
    },
    header: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        padding: theme.spacing(1, 2),
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        lineHeight: 1.5,
        color: theme.palette.text.secondary
    }
}));

const PreviewGrid = ({items = [], template = PreviewTemplate, onSelect, ...props}) => {

    const [rows, setRows] = useState(items)
    const [cols, setCols] = useState(props.cols || undefined)
    const [rowIndex, setRowIndex] = useState(items.length && items.length-1)

    useEffect(() => {
        setRows(items)
        setRowIndex(items.length && items.length-1)
        setCols([items[items.length-1]])
    }, [items])

    useEffect(() => {
        setCols(props.cols)
    }, [props.cols])

    const _onRowIndex = (index) => {
        setRowIndex(index)
        setCols([items[index]])

        onSelect && onSelect({
            rowIndex: index,
            item: items[index]
        })
    }

    const classes = useStyles()

    const Template = template

    const PreviewRow = ({item, index}) => {

        const expanded = index == rowIndex

        if (expanded) {

            return (
                <div className={classes.row} aria-expanded={expanded}>
                    <PreviewCols items={[item]} template={template} onSelect={onSelect} />
                </div>            
            )

        } else {

            return (
                <div className={classes.row} aria-expanded={expanded} onClick={() => _onRowIndex(index)}>
                    <Template {...item} expanded={expanded} />
                    <header className={classes.header}>{item.title}</header>
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