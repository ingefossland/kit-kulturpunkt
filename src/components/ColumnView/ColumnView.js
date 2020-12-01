import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    columnView: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        
        display: "flex",

        border: "1px solid",
        borderColor: theme.palette.divider,

        "& > *": {
            flexBasis: 0,
            flexGrow: 1
        },

        "& > * + *": {
            borderLeft: "1px solid",
            borderColor: theme.palette.divider
        }

    },

}));

const ColumnView = ({children}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <div className={classes.columnView}>
            {children}
        </div>
    )

}

export default ColumnView;