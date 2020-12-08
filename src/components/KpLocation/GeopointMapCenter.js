import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        width: props => { return theme.spacing(props.size) },
        height: props => { return theme.spacing(props.size) },
    },
    point: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: "50%",
        width: "100%",
        height: "100%",
        opacity: 0.25
    },
    crosshair: {
        position: "absolute",
        display: "block",
        width: "100%",
        height: "100%",
    },
    crosshairX: {
        display: "block",
        position: "absolute",
        left: "-15%",
        top: "50%",
        backgroundColor: "black",
        width: "130%",
        height: "1px"
    },
    crosshairY: {
        display: "block",
        position: "absolute",
        left: "50%",
        top: "-15%",
        backgroundColor: "black",
        width: "1px",
        height: "130%"
    }
}));

const GeopointMapCenter = ({size = 8}) => {

    const classes = useStyles({size})

    return (
        <div className={classes.root}>
            <div className={classes.point}>
            </div>
            <div className={classes.crosshair}>
                <div className={classes.crosshairX}></div>
                <div className={classes.crosshairY}></div>
            </div>
        </div>
    )

}

export default GeopointMapCenter;