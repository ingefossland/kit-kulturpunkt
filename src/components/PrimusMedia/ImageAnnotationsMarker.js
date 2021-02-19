import React, { useState, useEffect } from 'react';
// import "./ImageAnnotationsMarker.scss"
import Draggable, { DraggableCore } from 'react-draggable';
import { Transform } from 'stream';

import { makeStyles } from '@material-ui/core/styles';
import { getImagePointEvent } from "./utils/getImagePoint"




const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: props => { return props.zIndex },
        top: props => { return props.top + "%" || "50%"},
        left: props => { return props.left + "%" || "50%"},
    },
    draghandle: {
        position: "absolute",
//        top: 0,
//        left: 0,
        display: "block",
        backgroundColor: "blue", 
        width: theme.spacing(4) + "px",
        height: theme.spacing(4) + "px",

        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        opacity: 0.5,
        "&:hover": {
            cursor: props => { return props.cursor || "move" }
        }
    },
    marker: {
        width: props => { return theme.spacing(props.size) },
        height: props => { return theme.spacing(props.size) },
        top: "0",
        left: "0",
        position: "absolute",
        display: "block",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: "50%",
        opacity: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none"
    },
    label: {
        fontFamily: "Akkurat Mono, monspace",
        fontSize: "14px",
        color: "black"
    }
}));

const ImageAnnotationsMarker = ({index, top = 50, left = 50, size = 8, onStart, onDrag, onStop}) => {
    const [coords, setCoords] = useState({top: top, left: left}) 
    const [cursor, setCursor] = useState("grab") 

    const handleStart = (event) => {
        setCursor('grabbing')
        onStart && onStart(event)
    }

    const handleDrag = (event) => {
        const marker = getImagePointEvent(event)
        onDrag && onDrag(event)
        setCoords(marker)
    }

    const handleStop = (event) => {
        setCursor('grab')
        onStop && onStop(event)
    }    

    const classes = useStyles({size, zIndex: index, cursor: cursor, ...coords})

    return (
        <DraggableCore
            bounds="parent"
            handle=".draghandle"
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}>
            <div className={classes.root}>
                <div className={classes.draghandle + " draghandle"}></div>
                <div className={classes.marker}>
                    <div className={classes.label}>
                        {index+1}
                    </div>
                </div>
            </div>
        </DraggableCore>
    )
}

export default ImageAnnotationsMarker