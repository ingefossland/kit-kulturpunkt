import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        transition: ".125s ease-out"
    },
}));

const AppContent = ({className, expanded, children}) => {
    const classes = useStyles()

    return (
        <div className={className || classes.root} aria-expanded={expanded}>
            {children}
        </div>
    )
}

export default AppContent;