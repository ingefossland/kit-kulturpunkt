import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    body: {
        position: "relative",
        transition: ".125s ease-out",
    },
}));

const AppBody = ({className, expanded = false, children}) => {

    const classes = useStyles()

    return (
        <div className={className || classes.body} aria-expanded={expanded}>
            {children}
        </div>
    )
}

export default AppBody;