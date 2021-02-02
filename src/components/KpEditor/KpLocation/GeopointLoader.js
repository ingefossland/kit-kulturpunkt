import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#e5e3df",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }
}));

const GeopointLoader = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
                Loading ...
        </div>
    )        

}

export default GeopointLoader;