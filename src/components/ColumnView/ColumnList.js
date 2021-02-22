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

        boxShadow: props => { return theme.shadows[props.elevation] },

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
    list: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

    }

}));

const ColumnList = ({droppable, elevation = 0, expanded, children, ...props}) => {

    const classes = useStyles({elevation})

    if (!children) {
        return false
    }

    if (droppable) {
        const { provided, snapshot } = droppable
        const { droppableProps, innerRef } = provided
        const { isDraggingOver } = snapshot

        return (
            <div data-is-dragging-over={isDraggingOver} className={classes.column} {...droppableProps} ref={innerRef}>
                <div className={classes.list}>
                    {children}
                    {provided.placeholder}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.column} aria-expanded={expanded}>
            <div className={classes.list}>
                {children}
            </div>
        </div>
    )

}

export default ColumnList;