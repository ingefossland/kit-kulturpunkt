import React, { useState, useEffect } from 'react';

import List from "@material-ui/core/List"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    results: {
        "& > *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        }

    },
}));

const ListResultsLayout = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.results}>
            {children}
        </div>
    )
}

ListResultsLayout.propTypes = {
}

export default ListResultsLayout;