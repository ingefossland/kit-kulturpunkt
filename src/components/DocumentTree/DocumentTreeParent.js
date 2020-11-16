import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    treeitem: {
        border: "1px solid",
        borderColor: "transparent",

        "&[aria-expanded=true]": {
            borderColor: "black"
        }

    },

}));

const DocumentTreeItem = ({expanded = false, children, onClick}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    const _onClick = (event) => {
        event.stopPropagation()
        onClick && onClick()
    }

    return (
        <div className={classes.treeitem} aria-expanded={expanded} onClick={_onClick}>
            {children}
        </div>
    )

}

export default DocumentTreeItem;