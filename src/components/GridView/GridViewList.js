import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        justifyContent: "center",
//        width: "100%",


        /*

        justifyContent: "flex-start",
        alignItems: "flex-start",

        "& > *": {
            flexBasis: 0,
            flexGrow: 1
        }

        */
    },
    grid: {

        "& > *": {
            float: "left",
        }


    }

}));

/** ListViewBase */

const GridViewList = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.list}>
            <div className={classes.grid}>
                {children}
            </div>
        </div>
    )    

}


export default GridViewList;
