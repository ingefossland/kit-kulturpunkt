import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    overlay: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.25)"
    },
}));

const PreviewOverlay = ({children}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <div className={classes.overlay}>
            {children}
        </div>
    )
}

PreviewOverlay.propTypes = {
    children: PropTypes.node,
}

export default PreviewOverlay;