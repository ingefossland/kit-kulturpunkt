import React, { useEffect, useState } from "react"

import { 
    ModuleSelect, 
    ModuleTitle,
    ModuleDescription,
    ModuleLabel,
    ModuleIdentifier,
    ModuleToolbar
 } from "../Module"

import { makeStyles } from '@material-ui/core/styles';
import { getImageUrl } from "./utils"

const useStyles = makeStyles(theme => ({
    item: {
        display: "flex",
        height: 56,
        justifyContent: "flex-start",
        alignItems: "center",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected
        },

        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,

    },
    media: {
        flexGrow: 0,
        flexShrink: 0,
        width: 48,
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    header: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,

        "& > * + *": {
            marginLeft: 6
        }

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
    toolbar: {
        flexGrow: 0
    }
}));

const ListModule = ({
    placeholder = false,
    children,

    uniqueId,

    title,
    description,
    label,
    identifier,

    onClick,

    selectable,
    selected,
    onSelect,

    ...props
}) => {

    const classes = useStyles()

    const imageUrl = getImageUrl(props)

    if (placeholder) {
        return (
            <div className={classes.item} onClick={onClick}>
                { children || title }
            </div>
        )
    }

    const ModuleMedia = () => {

        return (
            <div className={classes.media}>
                <img src={imageUrl} className={classes.image} />
            </div>
        )

    }

    return (
        <div className={classes.item} aria-selected={selected} onClick={onClick}>
            { selectable &&
                <ModuleSelect 
                    selected={selected}
                    onClick={onClick ? undefined : onSelect}
                />
            }
            <ModuleMedia />
            <header className={classes.header}>
                <ModuleTitle maxWidth="50%">{title}</ModuleTitle>
                <ModuleLabel>{label}</ModuleLabel>
                <ModuleDescription>{description}</ModuleDescription>
            </header>
            <ModuleIdentifier>{identifier}</ModuleIdentifier>
            {!onClick && <ModuleToolbar {...props} /> }
        </div>
    )


}

export default ListModule;