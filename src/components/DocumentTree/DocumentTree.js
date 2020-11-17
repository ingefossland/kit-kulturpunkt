import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tree: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",

        width: "100%",

        "& > *": {
        },

        "& > * + *": {
            borderLeft: "1px solid",
            borderColor: theme.palette.divider
        },

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