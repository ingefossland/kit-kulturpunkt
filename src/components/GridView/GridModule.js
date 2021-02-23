import React, { useEffect, useState } from "react"

import { 
    ModuleSelect, 
    ModuleTitle,
    ModuleDescription,
    ModuleIdentifier,
    ModuleLabel
 } from "../Module"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    item: {
        display: "flex",
        flexDirection: "column",
        minWidth: props => { return props.width },
        maxWidth: "100%",
        justifyContent: "flex-start",
        alignItems: "center",

        "&[aria-selected=true]": {

            "& $media": {
                backgroundColor: "#ff0",
            },

            "& $image": {
                maxWidth: "90%",
                maxHeight: "90%",
                boxShadow: theme.shadows[2]
            }
    
        },

        position: "relative"

    },
    toolbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    media: {
        backgroundColor: "grey",
        width: "100%",
        height: props => { return props.height },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: 0,




    },
    header: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: 16,
    },
    artist: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 14,

    },
}));

const GridModule = ({width = 160, height = 160, selected, identifier, label, imageUrl, title, artist, onClick}) => {

    const classes = useStyles({width, height})

    return (
        <div className={classes.item} aria-selected={selected} onClick={onClick}>

            <div className={classes.media}>
                <img src={imageUrl} className={classes.image} />
            </div>
            <header className={classes.header}>
                <ModuleTitle>{title}</ModuleTitle>
                <ModuleLabel>{label}</ModuleLabel>
                <ModuleDescription>{artist}</ModuleDescription>
                <ModuleIdentifier>{identifier}</ModuleIdentifier>
            </header>
            <div className={classes.toolbar}>
                <ModuleSelect selected={selected} />
            </div>
        </div>
    )


}

export default GridModule;