import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    treeList: {
        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        },

        "& $treeList": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        },
       
        "&[data-is-dragging-over=true]": {
            backgroundColor: theme.palette.divider
        },

    },

}));

const TreeList = ({droppable, children}) => {

    const classes = useStyles();

    if (droppable && droppable.provided) {
        const { provided, snapshot } = droppable
        const { droppableProps, innerRef } = provided
        const { isDraggingOver } = snapshot

        return (
            <div {...droppableProps} 
                data-is-dragging-over={isDraggingOver}
                className={classes.treeList}
                ref={innerRef}>
                    {children}
                    {provided.placeholder}
            </div>
        )
    
    }

    return (
        <div className={classes.treeList}>
            {children}
        </div>
    )

}

export default TreeList