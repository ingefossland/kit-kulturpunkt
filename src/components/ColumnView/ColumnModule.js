import React, { forwardRef} from 'react';
import Icon from "@material-ui/core/Icon"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton"
import ToggleIcon from "@material-ui/icons/ChevronRight"
import DragIcon from '@material-ui/icons/DragHandle';

import { ModuleTitle, ModuleImage, ModuleIcon, ModuleToolbar } from "../Module"

const useStyles = makeStyles(theme => ({
    module: {
        width: "100%",
        overflow: "hidden",
        userSelect: "none",

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
        height: 48,
        margin: theme.spacing(0, 1),

        paddingRight: 24,

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
        flexShrink: 0,
        width: 36,
        height: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flexShrink: 1,
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    toggle: {
        width: 24,
        position: "absolute",
        right: 0,
        color: theme.palette.primary.main,
        cursor: "pointer"

    },
    footer: {
        display: "flex",
        overflow: "hidden",
        "& > * + *": {
            marginLeft: theme.spacing(1)
        }
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
    onClick,
    selectable,
    selected = false,

    onToggle,
    collapsible, 
    expanded = false,

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

    const ModuleToggle = ({onClick}) => {

        return (
            <ToggleIcon className={classes.toggle} onClick={onClick} />
        )
    }

    const ModuleMedia = () => {

        return (
            <div className={classes.media}>
                { !imageUrl && <ModuleIcon icon={icon} /> }
                { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
            </div>
        )

    }

    const ModuleContent = ({startAdornment}) => {

        return (
            <div className={classes.content}>
                {startAdornment}
                <ModuleMedia />
                <div className={classes.body}>
                    <ModuleTitle>{title}</ModuleTitle>
                </div>
                <ModuleToolbar {...props} className={classes.toolbar} />
                { collapsible && <ModuleToggle onClick={onToggle} /> || "" }
            </div>

        )

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
                data-is-dragging={isDragging}
                data-is-target={isTarget} ref={provided.innerRef} onClick={onClick}>
                    <ModuleContent startAdornment={<DragHandle dragHandleProps={provided.dragHandleProps} />} />
            </div>
        )   

    }

    return (
        <div className={classes.module} aria-expanded={expanded} onClick={onClick}>
            <ModuleContent />
       </div>
    )

}

export default ColumnModule;