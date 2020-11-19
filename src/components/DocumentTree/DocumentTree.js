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

        border: "1px solid",
        borderColor: theme.palette.divider,

        "& > *": {
            flexBasis: 0,
            flexGrow: 1,
            width: "auto",

            "&:last-child": {
                minWidth: "50%"
            }


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