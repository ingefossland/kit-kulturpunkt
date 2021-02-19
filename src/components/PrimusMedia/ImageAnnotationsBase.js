import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImagePreview from "./ImagePreview"

import MarkerDefault from "./ImageAnnotationsMarkerDefault"
import { withResizeDetector } from 'react-resize-detector';
import { getImagePointEvent } from "./utils/getImagePoint"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    list: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}));

const ImageAnnotations = ({
        className, 
        imageUrl, 
        imageCropdata = {}, 
        imageFocalpoint = {}, 
        imageFilters = {}, 
        imageAnnotations = [], 
        markerTemplate, 
        onChange,
        ...props
    }) => {

    const [isDragging, setIsDragging] = useState(false)

    const handleClick = (event) => {
        event.stopPropagation()

        const point = getImagePointEvent(event)

        setIsDragging(false)

        let newFormData;

        if (imageAnnotations.length) {
            newFormData = [...imageAnnotations, point]
        } else {
            newFormData = [point]
        }
 
        onChange && onChange(newFormData)
    }


    const handleIndexChange = (data, index) => {

        const marker = {
            ...imageAnnotations[index],
            ...data
        }

        const newFormData = imageAnnotations.map((item, i) => {
            const jsonValue = typeof marker === "undefined" ? null : marker;
            return index === i ? jsonValue : item;
        });        

        onChange && onChange(newFormData)


    }

    let MarkerTemplate;

    if (markerTemplate) {
        MarkerTemplate = markerTemplate
    } else {
        MarkerTemplate = MarkerDefault
    }

    const classes = useStyles()

    const MarkerList = withResizeDetector(({width, height}) => {

        const handleStart = (event, data, index) => {
            event.stopPropagation()

            setIsDragging(true)
        }
    
        const handleDrag = (event, data, index) => {
    //        setIsDragging(true)
        }
    
        const handleStop = (event, data, index) => {

            const x = data.x;
            const y = data.y;
    
            const left = (x/width) * 100 
            const top = (y/height) * 100 

            const fx = (x/width - 0.5) * 2;
            const fy = (y/height - 0.5) * -2;
    
            const coords = {
                left: left,
                top: top,
                x: fx,
                y: fy
            }

            console.log('COORDS', coords)

            handleIndexChange(coords, index)
            setIsDragging(false)

        }

        return (
            <div className={classes.list} onClick={!isDragging ? onChange && handleClick : undefined}>
                { imageAnnotations && imageAnnotations.length && imageAnnotations.map((marker, index) => {

                    const left = marker.left || 0
                    const top = marker.top || 0

                    const x = left * width/100;
                    const y = top * height/100;

                    if (!onChange) {
                        return (
                            <MarkerTemplate {...marker} index={index} key={index}
                                position={{
                                    x: x,
                                    y: y
                                }}
                            /> 
                        )
                    }

                    return (
                        <MarkerTemplate {...marker} index={index} key={index}
                                position={{
                                    x: x,
                                    y: y
                                }}
                                onStart={(event, data) => handleStart(event, data, index)}
                                onDrag={(event, data) => handleDrag(event, data, index)}
                                onStop={(event, data) => handleStop(event, data, index)}
                            /> 
                    )
                }) || ""}
            </div>
        )
     
    })

    return (
        <ImagePreview imageUrl={imageUrl} options={{disabled: true}}>
            <MarkerList />
        </ImagePreview>
    )


}

export default ImageAnnotations;