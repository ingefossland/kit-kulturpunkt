import React, { useRef, useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    media: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
}));

const GridMedia = ({imageUrl, imageCropdata, imageFilters, ...props}) => {
    const { width, height, x, y, imageWidth, imageHeight } = imageCropdata

    const mediaRef = useRef(null)

    const top = y
    const right = imageWidth - width - x
    const bottom = imageHeight - height - y
    const left = x

    const topPct = top/imageWidth * 100
    const rightPct = right/imageWidth * 100
    const bottomPct = bottom/imageWidth * 100
    const leftPct = left/imageWidth * 100

    let maxWidth = "auto", maxHeight = "auto"


//    let top, right, bottom, left

    if (width > height) {
        maxHeight = "100%"
    } else {
        maxWidth = "100%"
    }

    const imageStyle = {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
//        width: maxWidth,
//        height: maxHeight,
        opacity: .5,
        clipPath: "inset("+topPct+"% "+rightPct+"% "+bottomPct+"% "+leftPct+"%)"
//        transform: "translateX("+formData.x+")",
    }    
    

    const classes = useStyles()

    return (
        <figure className={classes.media} ref={mediaRef}>
            <img src={imageUrl} style={imageStyle} /> 
        </figure>
    )

}

export default GridMedia