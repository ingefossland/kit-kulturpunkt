

import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
 
    toolbar: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: 0,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        margin: theme.spacing(.5),
    },
    button: {

        "& + *": {
            marginLeft: theme.spacing(-.5)
        },

        "&[aria-selected=true]": {
            color: theme.palette.primary.main
        }

    }
}));

const ImageEditorToolbar = ({className, toolbar = [], action}) => {

    const classes = useStyles()

    const ToolbarButton = ({name, icon, onClick}) => {

        const selected = name === action

        return (
            <IconButton className={classes.button} aria-selected={selected} onClick={onClick}>
                <Icon>{icon}</Icon>
            </IconButton>
        )

    }

    return (
        <nav className={className || classes.toolbar}>
            {toolbar.map((button, index) => <ToolbarButton {...button} key={index} />)}
        </nav>
    )
    

}

export default ImageEditorToolbar;