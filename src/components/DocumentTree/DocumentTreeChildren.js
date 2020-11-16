import React from 'react';
import PropTypes from "prop-types";
import { withResizeDetector } from 'react-resize-detector';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    children: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

}));

const Masonry = ({width, columns = 3, spacing = 1, padding = 0, children, debug = false}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <div className={classes.children}>
            {children}
        </div>
    )

    return (
        <div className={classes.group}>

            <div className={classes.connector}></div>

            <div className={classes.children}>
                {children}
            </div>

        </div>
    )

}

export default withResizeDetector(Masonry);