import React, { useEffect, useState } from 'react';
import Icon from "@material-ui/core/Icon"
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/ArrowDropDown';
import DragIcon from '@material-ui/icons/DragHandle';
import { makeStyles } from '@material-ui/core/styles';

import { ModuleTitle, ModuleImage, ModuleIcon, ModuleToolbar } from "../Module"

const useStyles = makeStyles(theme => ({
    module: {
        width: "100%",
        overflow: "hidden",
        userSelect: "none",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-is-dragging=true]": {
            minWidth: theme.spacing(16),
            maxWidth: theme.spacing(32),
            backgroundColor: "white",
            boxShadow: theme.shadows[2],

            maxHeight: theme.spacing(6),

            "& $toolbar": {
                display: "none"
            },

            "& $children": {
                display: "none"
            },

            "& $toggle": {
                display: "none"
            },

            "& $content": {
                marginLeft: 0
            }


        },

        "&[data-is-target=true]": {
            backgroundColor: theme.palette.divider,

            "& $toolbar": {
                display: "none"
            }

        },

    },
    children: {

    },
    toolbar: {



    },
    content: {
        marginLeft: props => { return props.margin * 48 },
        height: props => { return props.minHeight },

        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",

        "& > $toolbar": {
            opacity: 0
        },

        "&:hover": {
            "& > $toolbar": {
                opacity: 1
            }
        }


    },
    media: {
        width: props => { return props.mediaSize},
        height: props => { return props.mediaSize},
        margin: theme.spacing(.5),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    toggle: {
        width: 48,
        position: "absolute",
        left: -48,

        transition: ".125s ease-in-out",
        transform: "rotate(-90deg)",

        "&[aria-expanded=true]": {
            transition: ".125s ease-in-out",
            transform: "rotate(0deg)"
        },

        color: theme.palette.primary.main,
        cursor: "pointer"

    },

}));

const TreeModule = ({
    level = 0, 
    size = "medium",
    minHeight,
    mediaSize,

    draggable, 

    collapsible, 
    expanded = false,
    onToggle,

    onClick,
    children,

    ...props
}) => {

    if (size === "small") {
        mediaSize = 36
        minHeight = 48
    }

    if (size === "medium") {
        mediaSize = 40
        minHeight = 56
    }

    if (size === "large") {
        mediaSize = 56
        minHeight = 72
    }

    const classes = useStyles({level, margin: level + 1, minHeight, mediaSize});

    const {
        selectable,
        selected,
        onSelect,

        icons = [],
        icon, 

        documentType,
        mediaType,
        
        title,
        imageUrl,


    } = props



    const DragHandle = ({dragHandleProps}) => {

        return (
            <IconButton {...dragHandleProps} >
                <DragIcon />
            </IconButton>
        )
    
    }

    const ModuleToggle = ({onClick}) => {

        return (
            <ToggleIcon className={classes.toggle} onClick={onClick} aria-expanded={expanded} />
        )

    }

    const ModuleMedia = () => {

        return (
            <div className={classes.media}>
                { !imageUrl && <ModuleIcon icons={icons} icon={icon} documentType={documentType} mediaType={mediaType} /> }
                { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
            </div>
        )

    }

    const ModuleContent = ({startAdornment}) => {

        return (
            <div className={classes.content}>
                { collapsible && <ModuleToggle onClick={onToggle} /> || "" }
                {startAdornment}
                <ModuleMedia />
                <div className={classes.body}>
                    <ModuleTitle>{title}</ModuleTitle>
                </div>
                <ModuleToolbar {...props} className={classes.toolbar} />
            </div>

        )

    }

    if (children && !React.isValidElement(children)) {
        children = undefined
    }
        
    if (draggable && draggable.provided) {

        const { provided, snapshot, } = draggable
        const { isDragging, combineTargetFor } = snapshot

        const isTarget = combineTargetFor && true

        return (
            <div className={classes.module}
                {...provided.draggableProps}
                aria-selected={selected}
                aria-expanded={expanded}
                data-is-dragging={isDragging}
                data-is-target={isTarget} ref={provided.innerRef} onClick={onClick}>
                    <ModuleContent startAdornment={<DragHandle dragHandleProps={provided.dragHandleProps} />} />
                    { children }
            </div>
        )
    

    }


    return (
        <div className={classes.module} aria-expanded={expanded} onClick={onClick}>
            <ModuleContent />
            { children }
        </div>
    )

}

export default TreeModule