import React, { useEffect, useState } from 'react';
import Icon from "@material-ui/core/Icon"
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/ArrowDropDown';
import DragIcon from '@material-ui/icons/DragHandle';
import { makeStyles } from '@material-ui/core/styles';

import { ModuleBase, ModuleTitle, NavToolbar } from "@kit-ui/admin"

const useStyles = makeStyles(theme => ({
    module: {
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

            "& $level": {
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
//        borderTop: "1px solid",
//        borderColor: theme.palette.divider,
    },
    toolbar: {

    },
    level: {
        marginLeft: props => { return props.level * 48 },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    content: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    media: {
        minWidth: 48,
        width: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 24,
        "& > svg": {
            fontSize: "inherit"
        }
    },
    image: {
        display: "block",
        width: 48,
    },
    toggle: {
        width: 48,
        position: "absolute",
        left: -48,

        "& $toggleIcon": {
            transition: ".125s ease-in-out",
            transform: "rotate(-90deg)",
        },

        "&[aria-expanded=true] $toggleIcon": {
//            transition: ".125s ease-in-out",
            transform: "rotate(0deg)"
        },
    },
    toggleIcon: {
        transition: ".125s ease-in-out",
        transform: "rotate(-90deg)",
    }

}));

const TreeModule = ({
    selectable,
    selected,
    onSelect,
    collapsible, 
    expanded = false,
    onToggle,
    draggable, 
    level, 
    title,
    imageUrl,
    icon, 
    renderChildren,
...props}) => {

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
            <IconButton className={classes.toggle} onClick={onClick} aria-expanded={expanded}>
                <ToggleIcon className={classes.toggleIcon} />
            </IconButton>
        )
    }

    const ModuleContent = () => {

        return (
            <div className={classes.content}>
                <div className={classes.media}>
                    { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                    { imageUrl && <img className={classes.image} src={imageUrl} /> }
                </div>
                <ModuleTitle>{title}</ModuleTitle>
            </div>

        )

    }

    const _onToggle = (event) => {
        event.stopPropagation()
        onToggle && onToggle()
    }

    const _onSelect = (event) => {
        event.stopPropagation()
        onSelect && onSelect()
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
                data-is-target={isTarget} ref={provided.innerRef} onClick={_onSelect}>
                <div className={classes.level}>
                    {collapsible && <ButtonToggle onClick={_onToggle} /> || "" }
                    <DragHandle dragHandleProps={provided.dragHandleProps} />
                    <ModuleContent />
                    <NavToolbar {...props} className={classes.toolbar} />
                </div>
                {expanded && renderChildren && <div className={classes.children}>{renderChildren()}</div> }
            </div>
        )
    

    }


    return (
        <div className={classes.module} onClick={_onSelect}>
            <div className={classes.level}>
                {collapsible && <ButtonToggle onClick={onToggle} /> }
                <ModuleContent />
            </div>
            {renderChildren && <div className={classes.children}>{renderChildren()}</div> }
        </div>
    )

}

export default TreeModule