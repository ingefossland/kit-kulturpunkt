import React, { useEffect, useState } from "react"
import PreviewTemplate from "./PreviewTemplate"
import PreviewScroller from "./PreviewScroller"

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

        position: "relative",

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

const PreviewCols = ({items = [], template = PreviewTemplate, onSelect}) => {

    const [cols, setCols] = useState(items)
    const [colIndex, setColIndex] = useState(items.length && items.length-1)

    useEffect(() => {
        console.log('items', items)
        setCols(items)
        setColIndex(items.length && items.length-1)
    }, [items])

    const _onColIndex = (index) => {
        setColIndex(index)
        onSelect && onSelect({
            colIndex: index,
            item: items[index]
        })
    }

    const _onSelectChild = (parents, item) => {

        const cols = [
            ...parents,
            item
        ]

        setColIndex(cols.length-1)

        setCols([
            ...parents,
            item
        ])

        console.log('cols', cols)


        onSelect && onSelect({parents, item})

    }

    const classes = useStyles()

    const Template = template

    const PreviewCol = ({item, index}) => {

        const expanded = index == colIndex
        const parents = cols.filter((parent, i) => i <= index)

        return (
            <div className={classes.col} aria-expanded={expanded} onClick={() => _onColIndex(index)}>
                <PreviewScroller>
                    <Template {...item} expanded={expanded} onSelect={(child) => _onSelectChild(parents, child)} />
                </PreviewScroller>
            </div>            
        )

        if (expanded) {
        }

        return (
            <div className={classes.col} aria-expanded={expanded} onClick={() => _onColIndex(index)}>
                <Template {...item} expanded={expanded} onSelect={(child) => _onSelectChild(parents, child)} />
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