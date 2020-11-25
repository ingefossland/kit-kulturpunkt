import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        flexDirection: "column",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

    }

}));

/** ListViewBase */

const ListViewBase = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.list}>
            {children}
        </div>
    )    

}


export default ListViewBase;
