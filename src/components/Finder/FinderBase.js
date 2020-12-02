import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: props => { return props.backgroundColor || theme.palette.background.default },
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        "& + $root": {
            left: "100%",
            width: "50%"
        },

        "&[aria-expanded=false]": {
            right: "50%"
        },

        "&[aria-expanded=false] + $root": {
            left: "50%"
        },
        
    },
}));

const FinderBase = ({backgroundColor, expanded = true, children}) => {
    const classes = useStyles({backgroundColor})

    return (
        <div className={classes.root} aria-expanded={expanded}>
            {children}
        </div>
    )

}

export default FinderBase;