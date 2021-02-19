import React, { useRef, useState, useMemo, useLayoutEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

import ViewHeader from "./ViewHeader"
import { ListView, GridView, GalleryView } from "."


const useStyles = makeStyles(theme => ({
    view: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
//        overflowY: "scroll",
        overflow: "auto",

        "&:hover": {

            "&::-webkit-scrollbar": {
                width: 8,
                height: 8,
                backgroundColor: "transparent",
                backgroundColor: theme.palette.divider
            },
    
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main
            },
    
        },


        "& > header": {
            position: "sticky",
            zIndex: 2,
            top: 0
        }

    }

}));

const templates = {
    "list": ListView,
    "grid": GridView,
    "gallery": GalleryView
}

const PrimusView = ({items, ...props}) => {


    const { view } = props

    const viewRef = useRef(null)

    const [scrollTop, setScrollTop] = useState(45)
 
    const _onScroll = (event) => {
//        setScrollTop(viewRef.current.scrollTop)
    }

    const ViewTemplate = templates && templates[view] || templates["list"]

    const classes = useStyles()

    return (
        <div className={classes.view} ref={viewRef} onScroll={_onScroll}>
            <ViewHeader {...props} />
            <ViewTemplate {...props} items={items} />
        </div>

    )

}

export default PrimusView;