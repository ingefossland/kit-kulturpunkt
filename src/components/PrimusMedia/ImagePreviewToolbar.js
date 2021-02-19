import React, { useState } from 'react';
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import ZoomInIcon from "@material-ui/icons/AddCircle"
import ZoomOutIcon from "@material-ui/icons/RemoveCircle"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
 
    toolbar: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        margin: theme.spacing(.5),


        "& > * + *": {

        }

    },
    scale: {
        fontFamily: "Akkurat mono, monospace",
        fontSize: 16,
        color: "white",
    },
    button: {
        color: "white",
    },
}));

const ImagePreviewToolbar = ({className, onReset, onZoomIn, onZoomOut, scale, minScale, maxScale, ...props}) => {

    const classes = useStyles()

    const ZoomInButton = () => {

        const disabled = props.disabled || scale >= maxScale

        return (
            <IconButton className={classes.button} disabled={disabled} onClick={onZoomIn}>
                <ZoomInIcon className={classes.icon} />
            </IconButton>
        )

    }

    const ZoomOutButton = () => {

        const disabled = props.disabled || scale <= minScale

        return (
            <IconButton className={classes.button} disabled={disabled} onClick={onZoomOut}>
                <ZoomOutIcon className={classes.icon} />
            </IconButton>
        )

    }

    const ScaleButton = () => {

        const label = Math.floor(scale * 100) + "%"

        return (
            <ButtonBase className={classes.scale} onClick={onReset}>
                {label}
            </ButtonBase>
        )

    }

    return (
        <nav className={className || classes.toolbar}>
            <ZoomOutButton />
            <ScaleButton />
            <ZoomInButton  />
            { /* JSON.stringify(props, 0, 2) */}
        </nav>
    )
    

}

export default ImagePreviewToolbar;