import React, { forwardRef} from 'react';
import Icon from "@material-ui/core/Icon"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"
import EditIcon from "@material-ui/icons/Edit"
import DragIcon from '@material-ui/icons/DragHandle';

import { ModuleBase, ModuleTitle, NavToolbar } from "@kit-ui/admin"

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "auto",
        width: "100%",
        maxWidth: "100%",
        minWidth: theme.spacing(16),
        overflow: "hidden",


        "&:hover": {
            cursor: "pointer"
        },

        "&[aria-expanded=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-is-dragging=true]": {
            minWidth: theme.spacing(16),
            maxWidth: theme.spacing(32),
            backgroundColor: "white",
            boxShadow: theme.shadows[2],

            "& $toolbar": {
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
    content: {
        flexBasis: 0,
        flexGrow: 1,

        width: "100%",

        marginTop: 8,
        marginBottom: 8,

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        color: "inherit",

        "& > *": {
            color: "inherit"
        }

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
    footer: {
        display: "flex",
        overflow: "hidden",
        "& > * + *": {
            marginLeft: theme.spacing(1)
        }
    },
    dragHandle: {
        margin: theme.spacing(.5)
    },
    toolbar: {
        display: "flex",
        flexWrap: "nowrap",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        }

    }
    
}));

const ColumnModule = ({
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
    ...props}) => {

    const classes = useStyles()

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
                <SelectIcon className={classes.toggleIcon} />
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

    const _onSelect = (event) => {
        event.stopPropagation()
        onSelect && onSelect()
    }

    if (draggable) {
        const { provided, snapshot } = draggable
        const { isDragging, combineTargetFor } = snapshot

        const isTarget = combineTargetFor && true

        return (
            <div className={classes.module} 
                {...provided.draggableProps}
                aria-selected={selected}
                aria-expanded={expanded}
                onClick={props.onSelect}
                data-is-dragging={isDragging}
                data-is-target={isTarget} ref={provided.innerRef} onClick={_onSelect}>
                    <DragHandle dragHandleProps={provided.dragHandleProps} />
                    <ModuleContent />
                    <NavToolbar {...props} className={classes.toolbar} />
                    {collapsible && <ButtonToggle onClick={onSelect} /> || "" }

            </div>
        )   

    }

    return (
        <div className={classes.module} aria-selected={selected}>
            <ModuleContent />
            <NavToolbar {...props} className={classes.toolbar} />
            {collapsible && <ButtonToggle onClick={onSelect} /> || "" }
        </div>
    )

}

export default ColumnModule;