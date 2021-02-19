import React, { useRef, useState, useEffect } from 'react';
// import "./ImageAnnotationsMarker.scss"
import Draggable, { DraggableCore } from 'react-draggable';

import { makeStyles } from '@material-ui/core/styles';
import { getImagePointEvent } from "./utils/getImagePoint"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: props => { return props.zIndex },
//        top: props => { return props.top + "%" || "50%"},
//        left: props => { return props.left + "%" || "50%"},
    },
    draghandle: {
        position: "absolute",
        display: "block",

        width: props => { return theme.spacing(props.size) },
        height: props => { return theme.spacing(props.size) },

        transform: "translate(-50%, -50%)",
        borderRadius: "50%",

        "&:hover": {
            cursor: props => { return props.cursor || "move" }
        }

    },
    marker: {
        width: props => { return theme.spacing(props.size) },
        height: props => { return theme.spacing(props.size) },
 
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText,

        top: "0",
        left: "0",
        position: "absolute",
        display: "block",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none"
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
    }
}));

const ImageAnnotationsMarker = ({index, position, size = 4, onStart, onDrag, onStop}) => {
    const [cursor, setCursor] = useState("grab") 

    const handleStart = (event, data) => {
        setCursor('grabbing')
        onStart && onStart(event, data)
    }

    const handleDrag = (event, data) => {
        onDrag && onDrag(event, data)
    }

    const handleStop = (event, data) => {
        setCursor('grab')
        onStop && onStop(event, data)
    }    

    const classes = useStyles({size, zIndex: index, cursor: cursor})

    if (!position) {
        return false
    }

    return (
        <Draggable
            bounds="parent"
            handle=".draghandle"
            position={position}
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
        </Draggable>
    )
}

export default ImageAnnotationsMarker