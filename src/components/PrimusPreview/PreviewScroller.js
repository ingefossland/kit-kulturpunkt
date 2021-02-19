import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    scroller: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll"
    },
}));

const PreviewScroller = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.scroller}>
            {children}
        </div>
    )


}

export default PreviewScroller;