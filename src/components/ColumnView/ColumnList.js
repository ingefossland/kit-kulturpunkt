import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    column: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[data-is-dragging-over=true]": {
            backgroundColor: theme.palette.divider
        },

        "&[aria-expanded=true]": {

            "&:hover": {
                width: theme.spacing(32),
                minWidth: theme.spacing(32),
            }

        }

    },

}));

const ColumnList = ({droppable, expanded, children, ...props}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    if (droppable) {
        const { provided, snapshot } = droppable
        const { droppableProps, innerRef } = provided
        const { isDraggingOver } = snapshot

        return (
            <div data-is-dragging-over={isDraggingOver} className={classes.column} {...droppableProps} ref={innerRef}>
                {children}
                {provided.placeholder}
            </div>
        )
    }

    return (
        <div className={classes.column} aria-expanded={expanded}>
            {children}
        </div>
    )

}

export default ColumnList;