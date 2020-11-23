import React, { forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"
import EditIcon from "@material-ui/icons/Edit"
import DragIcon from '@material-ui/icons/DragHandle';

import ModuleTitle from "./ModuleTitle"
import ModuleLabel from "./ModuleLabel"
import ModuleMetadata from "./ModuleMetadata"


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

        "& + $module": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

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
//        maxWidth: 256 - 48,

        marginTop: 8,
        marginBottom: 8,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        color: "inherit",

        "& > *": {
            color: "inherit"
        }

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
        position: "absolute",
        right: 0,
        margin: theme.spacing(.5),

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        }

    }
    
}));

const DocumentContent = ({url, uniqueId, title, documentType, onClick}) => {
    const classes = useStyles()

    return (
        <div className={classes.content} onClick={onClick}>
            <ModuleTitle title={title} />
            <footer className={classes.footer}>
                <ModuleLabel>{documentType}</ModuleLabel>
            </footer>
        </div>
    )

}

const Toolbar = ({children, onSelect, onEdit}) => {

    const classes = useStyles()

    const _onEdit = (event) => {
        event.stopPropagation()
        onEdit && onEdit()
    }

    return (
        <div className={classes.toolbar}>

                <IconButton onClick={_onEdit}>
                    <EditIcon />
                </IconButton>

                {children && 
                    <IconButton  onClick={onSelect}>
                        <SelectIcon />
                    </IconButton>
                }

        </div>
    )

}

const DragHandle = ({dragHandleProps}) => {

    const classes = useStyles()

    return (
        <IconButton {...dragHandleProps} className={classes.dragHandle}>
            <DragIcon />
        </IconButton>
    )

}

const DocumentTreeRow = ({draggable, expanded, selected, ...props}) => {

    const classes = useStyles()

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
                data-is-target={isTarget} ref={provided.innerRef}>
                    <DragHandle dragHandleProps={provided.dragHandleProps} />
                    <DocumentContent {...props} />
                    <Toolbar {...props} />
            </div>
        )   

    }

    return (
        <div className={classes.module} aria-selected={selected}>
            <DocumentContent {...props} />
        </div>
    )

}

export default DocumentTreeRow;