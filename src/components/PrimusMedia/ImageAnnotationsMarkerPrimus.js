import React, { useState, useEffect } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { Transform } from 'stream';
import Color from 'color';

import { makeStyles } from '@material-ui/core/styles';

import DragIcon from "@material-ui/icons/DragHandle"
import RemoveIcon from "@material-ui/icons/RemoveCircle"
import IconButton from "@material-ui/core/IconButton"
import ButtonBase from "@material-ui/core/ButtonBase"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
//        top: props => { return props.top + "%" || "50%"},
//        left: props => { return props.left + "%" || "50%"},
        zIndex: props => { return props.zIndex },
    },
    shape: {
        position: "absolute",
        top: "100%",
        left: "100%",
        width: theme.spacing(2),
        height: theme.spacing(2),
        backgroundColor: props => { return props.color }

    },
    size: {
        display: "block",
        position: "absolute",
//        top: props => { return props.shape === "circle" && theme.spacing(props.size/2 * -1) },
//        right: props => { return props.shape === "circle" && theme.spacing(props.size/2 * -1) },
//        bottom: props => { return props.shape === "circle" && theme.spacing(props.size/2 * -1) },
//        left: props => { return props.shape === "circle" && theme.spacing(props.size/2 * -1) },
        top: 0,
        left: 0,
        width: props => { return props.shape === "circle" && theme.spacing(props.size) || theme.spacing(props.width) },
        height: props => { return props.shape === "circle" && theme.spacing(props.size) || theme.spacing(props.height) },

        position: "absolute",
        display: "block",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& $colors": {
            display: "none"
        },
        "&:hover $colors": {
            display: "flex"
        },

        "& $removeButton": {
            display: "none"
        },
        "&:hover $removeButton": {
            display: "flex"
        },
       
        "& $handleButton": {
            display: "none"
        },
        "&:hover $handleButton": {
            display: "flex"
        },


        "&:hover $shape": {
            backgroundColor: props => { return props.hoverColor },
//            borderColor: "transparent",
            borderStyle: "dotted",
        },

        "&:hover $labelButton": {
        }

    },
    shape: {
        display: "block",
        position: "absolute",
        top: props => { return props.shape === "circle" && 0 || theme.spacing(.5) },
        right: props => { return props.shape === "circle" && 0 || theme.spacing(.5) },
        bottom: props => { return props.shape === "circle" && 0 || theme.spacing(.5) },
        left: props => { return props.shape === "circle" && 0 || theme.spacing(.5) },

        border: "2px solid",
        color: props => { return props.contrastColor},
        borderColor: props => { return props.color},
        borderRadius: props => { return props.shape === "circle" && "50%" || "0" },

        "&:hover": {
            cursor: props => { return props.cursor || "move" }
        }
    },
    labelButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Akkurat Mono, monspace",
        fontSize: "14px",
        width: props => { return props.shape === "circle" && theme.spacing(3.5) || theme.spacing(4) },
        height: props => { return props.shape === "circle" && theme.spacing(3.5) || theme.spacing(4) },
        backgroundColor: props => { return props.color },
        border: "1px solid",
        borderColor: props => { return props.color },
        color: props => { return props.contrastColor },
        borderRadius: props => { return props.shape === "rectangle" && "50%" || "0" },
    },
    removeButton: {
        position: "absolute",
        top: theme.spacing(-2),
        right: theme.spacing(-2),
    },
    removeShape: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props => { return props.color },
        width: "18px",
        height: "18px",
        borderRadius: "9px",
    },
    removeIcon: {
        display: "block",
        backgroundColor: props => { return props.contrastColor || theme.palette.text.primary },
        width: "9px",
        height: "2px",
    },
    colors: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    colorButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    colorIcon: {
        display: "block",
        backgroundColor: props => { return props.color },
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1)
    },
    handleButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: props => { return props.top && "0" || "auto" },
        right: props => { return props.right && "0" || "auto" },
        bottom: props => { return props.bottom && "0"  || "auto" },
        left: props => { return props.left && "0"  || "auto" },
        margin: theme.spacing(-1)
    },
    handleIcon: {
        display: "block",
        backgroundColor: props => { return props.color },
        width: theme.spacing(1),
        height: theme.spacing(1),
        margin: theme.spacing(1)
    }
}));

const ButtonHandle = ({color, top, right, bottom, left, onResize}) => {
    const classes = useStyles({color, top, left, bottom, right})

    const handleResize = ({x, y}) => {
        if (left) {
            x = x * -1
        }

        if (top) {
            y = y * -1
        }

        onResize && onResize({x, y})

    }

    const handleStart = (event, data) => {
        console.log('onStart', data)
    }

    const handleDrag = (event, data) => {
        console.log('onDrag', data)
    }

    const handleStop = (event, data) => {
        console.log('onStop', data)
        handleResize(data)
    }

    return (
        <Draggable
            position={{x: 0, y: 0}}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}>
                <ButtonBase className={classes.handleButton}>
                    <i className={classes.handleIcon}></i>
                </ButtonBase>
        </Draggable>
    )

}

const ButtonLabel = ({index, color, contrastColor, shape, onClick}) => {
    const classes = useStyles({color, contrastColor, shape})

    return (
        <ButtonBase className={classes.labelButton} onClick={onClick}>
            {index+1}
        </ButtonBase>
    )

}

const ButtonRemove = ({className, color, contrastColor, onClick}) => {
    const classes = useStyles({color, contrastColor})

    return (
        <IconButton className={className || classes.removeButton} onClick={onClick}>
            <b className={classes.removeShape}>
                <i className={classes.removeIcon}></i>
            </b>
        </IconButton>
    )
}

const ButtonColor = ({color, onClick}) => {
    const classes = useStyles({color})

    return (
        <ButtonBase className={classes.colorButton} onClick={color && onClick}>
            <i className={classes.colorIcon}></i>
        </ButtonBase>
    )
}

const MarkerPrimus = ({index, position, onStart, onDrag, onStop, ...props}) => {

    const colors = [
        "white",
        "#bbb",
        "#777",
        "#333",
        "black",
        "red",
        "green",
        "blue",
        "#FF8080",
        "#80FF80",
        "#8080FF",
        "yellow",
        "#0ff",
        "#f0f",
        "#ffff08",
        "#08ffff",
        "#ff08ff"
    ]

    const [cursor, setCursor] = useState("grab") 
    const [shape, setShape] = useState(props.shape || "circle") 
    const [size, setSize] = useState(props.size || 12) 
    const [width, setWidth] = useState(props.width || props.size || 12) 
    const [height, setHeight] = useState(props.height || props.size || 12) 

    const [color, setColor] = useState(props.color || color[0]) 
    const [contrastColor, setContrastColor] = useState(color[0]) 
    const [borderColor, setBorderColor] = useState(color[0]) 
    const [nextColor, setNextColor] = useState(color[0]) 
    const [prevColor, setPrevColor] = useState(color[0]) 
    const [hoverColor, setHoverColor] = useState(color[0]) 

    useEffect(() => {
//        setCoords({top: top, left: left})
        setContrastColor(Color(color).isDark() && "white" || "black")
        setBorderColor(Color(color).isDark() && "rgba(255,255,255,.5)" || "rgba(0,0,0,.5)")
        setHoverColor(Color(color).alpha(0.25).rgb().string())
        setNextColor(colors[colors.indexOf(color)+1] || colors[0])
        setPrevColor(colors[colors.indexOf(color)-1] || colors[colors.length-1])
    }, [color, index])

    const toggleColor = (color) => {
        setColor(color)
    }

    const toggleShape = () => {
        if (shape === "circle") {
            setShape('rectangle')
            setWidth(size)
            setHeight(size)
        } else {
            setShape('circle')
            setSize((width+height)/2)
        }
    }

    const handleStart = (event, data) => {
        event.stopPropagation()
        setCursor('grabbing')
        onStart && onStart(event, data)
    }

    const handleDrag = (event, data) => {
        event.stopPropagation()
        onDrag && onDrag(event, data)
    }

    const handleStop = (event, data) => {
        event.stopPropagation()
        setCursor('grab')
        onStop && onStop(event, data)
    }

    const handleResize = ({x, y}) => {

        const newWidth = width + x/8
        const newHeight = height + y/8

        setWidth(newWidth)
        setHeight(newHeight)
        setSize((newWidth+newHeight)/2)
    }

    const classes = useStyles({size, width, height, zIndex: index, color, contrastColor, hoverColor, cursor, shape})

    return (
        <Draggable
            bounds="parent"
            handle=".draghandle"
            position={position}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}>
            <div className={classes.root}>
                <div className={classes.size}>
                    <div className={classes.shape + " draghandle"}></div>
                    <ButtonHandle top left color={color} onResize={handleResize} />
                    <ButtonHandle bottom left color={color} onResize={handleResize} />
                    <ButtonHandle bottom right color={color} onResize={handleResize} />
                    <ButtonRemove className={classes.removeButton} color={color} contrastColor={contrastColor} />
                    <div className={classes.colors}>
                        <ButtonColor color={prevColor} onClick={() => toggleColor(prevColor)} />
                        <ButtonLabel shape={shape} color={color} contrastColor={contrastColor} index={index} onClick={toggleShape} />
                        <ButtonColor color={nextColor} onClick={() => toggleColor(nextColor)} />
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

MarkerPrimus.defaultProps = {
    color: "white"
}

export default MarkerPrimus