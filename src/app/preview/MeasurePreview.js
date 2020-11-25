import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { PreviewBase } from "../components/"

const useStyles = makeStyles(theme => ({
    list: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    scene: {
        perspective: 600,
    },
    cube: {
        width: 100,
        height: 100,
        margin: 50,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: props => { return "scaleX("+props.scaleX+") scaleY("+props.scaleY+")  scaleZ("+props.scaleZ+")" },
    },
    face: {
        position: "absolute",

        width: 100,
        height: 100,

        border: "1px solid",
        borderColor: "white",

        opacity: .5,

        "&[data-face=front]": {
            transform: "rotateY(0deg) translateZ(50px)",
        },
        "&[data-face=right]": {
            transform: "rotateY(90deg) translateZ(50px)"
        },
        "&[data-face=back]": {
            transform: "rotateY(180deg) translateZ(50px)"
        },
        "&[data-face=left]": {
            transform: "rotateY(-90deg) translateZ(50px)"
        },
        "&[data-face=top]": {
            transform: "rotateX(90deg) translateZ(50px)",
        },
        "&[data-face=bottom]": {
            transform: "rotateX(-90deg) translateZ(50px)",
        }


    }
}));

const Measure = ({name, width, height, depth, unit}) => {


    const scaleX = (width/width) * 1 || 1
    const scaleY = (height/width) * 1 || 1
    const scaleZ = (depth/width) * 1 || 1
    

    const classes = useStyles({scaleX, scaleY, scaleZ})

    return (
        <div className={classes.scene}>
            <div className={classes.cube}>
                <div className={classes.face} data-face="front">Front</div>
                <div className={classes.face} data-face="back">Back</div>
                <div className={classes.face} data-face="right">Right</div>
                <div className={classes.face} data-face="left">Left</div>
                <div className={classes.face} data-face="top">Top</div>
                <div className={classes.face} data-face="bottom">Bottom</div>
            </div>
        </div>
    )

}


const MeasurePreview = ({formData = [], formContext}) => {

    const classes = useStyles()

    if (!formData.length) {
        return <p>No measures</p>
    }

    return (
        <PreviewBase>
            <div className={classes.list}>
                {formData && formData.map(measure => <Measure {...measure} />)}
            </div>
        </PreviewBase>
    )
}

MeasurePreview.propTypes = {
    formData: PropTypes.array,
}

export default MeasurePreview;