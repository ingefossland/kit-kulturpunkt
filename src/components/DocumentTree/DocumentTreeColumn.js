import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
    column: {
        flexBasis: 0,
        flewGrow: 1,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100%",
        minWidth: theme.spacing(7),
        minWidth: theme.spacing(32),
        overflowY: "scroll",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-droppable=true]": {
            backgroundColor: "yellow"
        },

        "&[aria-expanded=true]": {
//            width: theme.spacing(7),

            "&:hover": {
                width: theme.spacing(32),
                minWidth: theme.spacing(32),
            }

        }

    },

}));

const DocumentTreeColumn = ({droppableProps, innerRef, droppableId, expanded, children}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    if (droppableId) {
        return (
            <Droppable droppableId={droppableId} isCombineEnabled={true}>
                {(provided, snapshot) => {

                    const droppable = snapshot.isDraggingOver

                   return (
                        <div data-droppable={droppable} className={classes.column} {...provided.droppableProps} ref={provided.innerRef}>
                        {children}
                        {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        )
    }

    return (
        <div {...droppableProps} ref={innerRef} className={classes.column} aria-expanded={expanded}>
            {children}
        </div>
    )

}

export default DocumentTreeColumn;