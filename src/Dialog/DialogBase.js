import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dialog: {
        backgroundColor: theme.palette.background.default,
        backgroundColor: "#eee",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
}));


const DialogBase = ({children}) => {
    const classes = useStyles()

    return (
        <section className={classes.dialog}>
            {children}
        </section>
    )
}

export default DialogBase