import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    treeView: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        
        border: "1px solid",
        borderColor: theme.palette.divider,

    },

}));

const TreeView = ({droppable, children, ...props}) => {

    const classes = useStyles();

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