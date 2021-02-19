import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        "& > * + *": {
            marginTop: theme.spacing(2)
        }

    },
}));

const ListSearchLayout = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.search}>
            {children}
        </div>
    )
}

ListSearchLayout.propTypes = {
}

export default ListSearchLayout;