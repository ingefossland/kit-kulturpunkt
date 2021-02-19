import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
    },
 
}));

const ListSearchItem = ({className, children}) => {

    const classes = useStyles()

    return (
        <div className={className || classes.list}>
            {children}
        </div>
    )
}

ListSearchItem.propTypes = {
}

export default ListSearchItem;