import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"
import DragHandle from '@material-ui/icons/DragHandle';

import ModuleTitle from "./ModuleTitle"
import ModuleLabel from "./ModuleLabel"
import ModuleMetadata from "./ModuleMetadata"


const useStyles = makeStyles(theme => ({
    module: {
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
        minWidth: 256,
        overflow: "hidden",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-drop-target=true]": {
            backgroundColor: "red"
        },
    },
    dragHandle: {
//        margin: theme.spacing(1)
    },
    content: {
        position: "relative",
        flexBasis: 0,
        flexGrow: 1,
        padddingRight: 48,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        margin: theme.spacing(1),
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

const DocumentContent = ({url, uniqueId, title, documentType, children, onSelect}) => {
    const classes = useStyles()

    return (
        <div className={classes.content} onClick={onSelect}>
            <ModuleTitle title={title} />
            <footer className={classes.footer}>
                <ModuleLabel>{documentType}</ModuleLabel>
            </footer>
            {children && 
                <IconButton className={classes.select} onClick={onSelect}>
                    <SelectIcon />
                </IconButton>
            }
        </div>
    )

}

const DocumentTreeRow = ({draggableId, index, selected, ...props}) => {

    const classes = useStyles()

    if (draggableId) {
        return (
            <Draggable index={index} draggableId={draggableId}>
                {(provided, snapshot) => {

                    const dropTarget = snapshot.combineTargetFor && true

                    return (
                        <div className={classes.module} aria-selected={selected} data-drop-target={dropTarget} {...provided.draggableProps} ref={provided.innerRef}>

                            <IconButton className={classes.dragHandle} {...provided.dragHandleProps} >
                                <DragHandle />
                            </IconButton>

                            <DocumentContent {...props} />
                        </div>
                    )   
                }}
            </Draggable>
        )
    }

    return (
        <div className={classes.module} aria-selected={selected}>
            <DocumentContent {...props} />
        </div>
    )

}

export default DocumentTreeRow;