import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    base: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
}));

const PreviewBase = ({children}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <div className={classes.base}>
            {children}
        </div>
    )
}

PreviewBase.propTypes = {
    children: PropTypes.node,
}

export default PreviewBase;