import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { makeStyles } from '@material-ui/core/styles';

import ImagePreviewToolbar from "./ImagePreviewToolbar"

const useStyles = makeStyles(theme => ({
    preview: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& .react-transform-component": {

            overflow: "visible"
        }
    },

    figure: {
        padding: 0,
        margin: 0,
        zIndex: 1,
    },

}));

const ImagePreview = ({imageUrl, onTransformChange, children, options = {}}) => {
    const classes = useStyles();


    const TransformToolbar = ({prevScale, scale, zoomIn, zoomOut, resetTransform, positionX, positionY, options: { disabled, minScale, maxScale }, ...props}) => {

        return <ImagePreviewToolbar 
            {...props}
            disabled={disabled}
            scale={scale}
            minScale={minScale}
            maxScale={maxScale}
            onReset={resetTransform}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            />
        
    }

    return (
        <div className={classes.preview}>
            <TransformWrapper 
                options={options}>
                {(props) => (
                    <React.Fragment>
                        <TransformToolbar {...props} />
                        <TransformComponent>
                            <figure className={classes.figure}>
                                <img src={imageUrl} />
                                {children}
                            </figure>
                        </TransformComponent>
                    </React.Fragment>
            )}
            </TransformWrapper>
        </div>
    )
    

}

export default ImagePreview;