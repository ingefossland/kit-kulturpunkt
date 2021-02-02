import React, { useRef, useState, useMemo, useLayoutEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    view: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll",

        "& > header": {
            position: "sticky",
            zIndex: 2,
            top: 0
        }

    }

}));

const ViewBase = ({children}) => {

    const viewRef = useRef(null)

    const [scrollTop, setScrollTop] = useState(45)
 
    const _onScroll = (event) => {
//        setScrollTop(viewRef.current.scrollTop)
    }

    const classes = useStyles()

    return (
        <div className={classes.view} ref={viewRef} onScroll={_onScroll}>
            {children}
        </div>

    )

}

export default ViewBase;