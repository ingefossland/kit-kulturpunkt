import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    treeView: {
        position: "relative",
        border: "1px solid",
        borderColor: theme.palette.divider,
        boxShadow: props => { return theme.shadows[props.elevation] }
    },

}));

const TreeView = ({border = 0, elevation = 1, droppable, children, ...props}) => {

    const classes = useStyles({border, elevation})

    if (droppable && droppable.provided) {
        const { provided, snapshot } = droppable
        const { droppableProps, innerRef } = provided
        const { isDraggingOver } = snapshot

        return (
            <div {...droppableProps} 
                data-is-dragging-over={isDraggingOver}
                className={classes.treeView}
                ref={innerRef}>
                    {children}
                    {provided.placeholder}
            </div>
        )
    
    }

    return (
        <div className={classes.treeView}>
            {children}
        </div>
    )

}

export default TreeView