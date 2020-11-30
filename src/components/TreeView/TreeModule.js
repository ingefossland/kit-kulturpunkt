import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/ArrowDropDown';
import DragIcon from '@material-ui/icons/DragHandle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        paddingLeft: props => { return props.level * 48 },

        "&[data-is-dragging=true]": {
            minWidth: theme.spacing(16),
            maxWidth: theme.spacing(32),
            backgroundColor: "white",
            boxShadow: theme.shadows[2],

            "& $toolbar": {
                display: "none"
            },

            "& $children": {
                display: "none"
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
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    toggleButton: {
        position: "absolute",
        left: -48,
        "&[aria-expanded=true] $toggleIcon": {
            transition: ".125s ease-in-out",
            transform: "rotate(0deg)"
        },
    },
    toggleIcon: {
        transition: ".125s ease-in-out",
        transform: "rotate(-90deg)",
    }

}));
const TreeModule = ({draggable, hasChildren, level, title, selected, expanded = false, children, onToggle}) => {


    const classes = useStyles({level});

    const DragHandle = ({dragHandleProps}) => {

        return (
            <IconButton {...dragHandleProps} >
                <DragIcon />
            </IconButton>
        )
    
    }


    const ButtonToggle = ({onClick}) => {
    
        return (
            <IconButton className={classes.toggleButton} onClick={onClick} aria-expanded={expanded}>
                <ToggleIcon className={classes.toggleIcon} />
            </IconButton>
        )
    }

    if (draggable && draggable.provided) {

        const { provided, snapshot, } = draggable
        const { isDragging, combineTargetFor } = snapshot

        const isTarget = combineTargetFor && true

        return (
            <div className={classes.treeModule}
                {...provided.draggableProps}
                aria-selected={selected}
                aria-expanded={expanded}
                data-is-dragging={isDragging}
                data-is-target={isTarget} ref={provided.innerRef}>
                <div className={classes.content}>
                    {hasChildren && <ButtonToggle onClick={onToggle} /> || "" }
                    <DragHandle dragHandleProps={provided.dragHandleProps} />
                    <div>{title}</div>
                </div>
            </div>
        )
    

    }


    return (
        <div className={classes.treeModule}>
            <div className={classes.content}>
                {children && <ButtonToggle onClick={onToggle} /> }
                <div>{title}</div>
            </div>
        </div>
    )

}

export default TreeModule