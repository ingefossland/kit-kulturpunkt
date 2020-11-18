import React, { forwardRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"
import DragHandle from '@material-ui/icons/DragHandle';

import ModuleTitle from "./ModuleTitle"
import ModuleLabel from "./ModuleLabel"
import ModuleMetadata from "./ModuleMetadata"


const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
        minWidth: 256,
        overflow: "hidden",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-is-dragging=true]": {
            minWidth: 192,
            maxWidth: 256,
            backgroundColor: "white",
            boxShadow: theme.shadows[2],
        },

        "&[data-is-target=true]": {
            backgroundColor: theme.palette.divider
        },
    },
    dragHandle: {
//        margin: theme.spacing(1)
    },
    content: {
        flexBasis: 0,
        flexGrow: 1,

        maxWidth: 256 - 48,

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
    select: {
        position: "absolute",
        right: 0,
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

const DocumentTreeRow = ({draggable, selected, children, onSelect, ...props}) => {

    const classes = useStyles()

    if (draggable) {
        const { provided, snapshot } = draggable

        const { isDragging, combineTargetFor } = snapshot

        const isTarget = combineTargetFor && true

        return (
            <div className={classes.module} 
                {...provided.draggableProps}
                aria-selected={selected}
                data-is-dragging={isDragging}
                data-is-target={isTarget} ref={provided.innerRef}>
                <IconButton {...provided.dragHandleProps} className={classes.dragHandle}>
                    <DragHandle />
                </IconButton>

                <DocumentContent {...props} onClick={onSelect} />
                {children && 
                    <IconButton className={classes.select} onClick={onSelect}>
                        <SelectIcon />
                    </IconButton>
                }
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