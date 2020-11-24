import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        /*
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        
        justifyContent: "flex-start",
        alignItems: "flex-start",

        margin: "0 auto",
        */

       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(192px, max-content))',
       gridGap: 0,
       padding: 'initial',
       justifyContent: 'center',

    },

}));

/** ListViewBase */

const GridViewList = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.grid}>
            <div className={classes.list}>
                {children}
            </div>
        </div>
    )    

}


export default GridViewList;
