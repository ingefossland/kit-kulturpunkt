import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tree: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
}));

const DocumentTree = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.tree}>
            {children}
        </div>
    )

}

export default DocumentTree