import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from 'react-resize-detector';

//import { getImageCropdataStyles } from "./utils/getImageCropdataStyles"
import { getImageFiltersStyle } from "../../Media/utils/getImageFiltersStyle"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
//        overflow: "hidden"
    },
    cropbox: {
        position: "absolute",
        overflow: props => { return props.overflow },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "auto",
        opacity: .5
    },
    image: {
        position: "absolute",
        opacity: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "block",
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
    },
    debug: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column"
    }
}));

const ImageBase = ({
    className = undefined,
    overflow = "hidden", 
    imageUrl = undefined, 
    imageCropdata = undefined, 
    imageFilters = undefined,
    onLoad,
    onClick,
    children,
    width,
    height}) => {

    const parentRef = useRef(null)
    const cropboxRef = useRef(null)
    const imageRef = useRef(null)

    const [parentWidth, setParentWidth] = useState(null)
    const [parentHeight, setParentHeight] = useState(null)

    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageWidth, setImageWidth] = useState(null)
    const [imageHeight, setImageHeight] = useState(null)

    const [cropboxStyle, setCropboxStyle] = useState(null)
    const [cropWidth, setCropWidth] = useState(null)
    const [cropHeight, setCropHeight] = useState(null)

    const [imageCropStyle, setImageCropStyle] = useState(null)
    const [imageFiltersStyle, setImageFiltersStyle] = useState(null)

    const classes = useStyles({overflow})

    const getImage = () => {

        if (!imageRef.current) {
            return
        }

        imageRef.current.addEventListener('load', event => {
            const imageWidth = imageRef && imageRef.current && imageRef.current.offsetWidth;
            const imageHeight = imageRef && imageRef.current && imageRef.current.offsetHeight;

            const parentWidth = parentRef && parentRef.current && parentRef.current.offsetWidth;
            const parentHeight = parentRef && parentRef.current && parentRef.current.offsetHeight;

            const cropboxWidth = cropboxRef && cropboxRef.current && cropboxRef.current.offsetWidth;
            const cropboxHeight = cropboxRef && cropboxRef.current && cropboxRef.current.offsetHeight;

            setImageLoaded(true)
            setImageWidth(imageWidth)
            setImageHeight(imageHeight)

            setParentWidth(parentWidth)
            setParentHeight(parentHeight)

            setCropWidth(cropboxWidth)
            setCropHeight(cropboxHeight)

            onLoad && onLoad({
                parentRef,
                parentWidth: parentWidth,
                parentHeight: parentHeight,
                cropboxRef,
                cropboxWidth: cropboxWidth,
                cropboxHeight: cropboxHeight,
                imageRef,
                imageWidth: imageWidth,
                imageHeight: imageHeight
            })


        })

    }

    const getImageFilters = () => {

        if (!imageFilters) {
            return
        }

        const filters = getImageFiltersStyle({imageFilters})
        setImageFiltersStyle(filters)

    }

    const getImageCropdataStyles = ({imageCropdata, parent, image }) => {

        const parentW = parentRef.current.offsetWidth;
        const parentH = parentRef.current.offsetHeight;
        const parentRatio = parentW / parentH;
    
        const imageW = imageRef.current.naturalWidth;
        const imageH = imageRef.current.naturalHeight;
    
        const cropdataW = imageCropdata && imageCropdata.width || imageW
        const cropdataH = imageCropdata && imageCropdata.height || imageH
        const cropdataX = imageCropdata && imageCropdata.x || 0
        const cropdataY = imageCropdata && imageCropdata.y || 0
        const cropRatio = cropdataW / cropdataH


        /*

        const cropW = (parentH / cropdataH) * cropdataW + "px"
        const cropH = (parentW / cropdataW) * cropdataH + "px"

        let cropboxStyle = {
            width: cropW,
            height: cropH
        }

        */

        let cropboxStyle, cropWidth, cropHeight, cropScale

        if (cropRatio > parentRatio) {

            cropHeight = (parentW / cropdataW) * cropdataH + "px"
            cropScale = imageW / cropdataW

            cropboxStyle = {
                width: "100%",
                height: cropHeight,
                transform: 'scale('+cropScale+')'
            }

            
        } else {

            cropWidth = (parentH / cropdataH) * cropdataW + "px"
            cropScale = imageW / cropdataH

            cropboxStyle = {
                width: cropWidth,
                height: "100%",
                transform: 'scale('+cropScale+')'
            }


        }
    
        // image
    
        const imageWidth = imageW / cropdataW * 100;
        const imageHeight = imageH / cropdataH * 100;
    
        const imageX = cropdataX / imageW * 100 * -1;
        const imageY = cropdataY / imageH * 100 * -1;
    
        const imageTransform = 'translateX('+ imageX + '%) translateY('+imageY+'%)';
    
        const imageStyle = {
            position: 'absolute',
            top: 0,
            right: 'auto',
            bottom: 'auto',
            left: 0,
            width: imageWidth + "%",
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            transformOrigin: 'top left',
            transform: imageTransform
        }
    
        return {
            cropbox: cropboxStyle,
            image: imageStyle
        }
    
    }
    

    const getImageCrop = () => {

        if (!imageRef.current || !parentRef.current) {
            return
        }

        if (!imageCropdata) {
            return
        }

        const cropStyles = getImageCropdataStyles({imageCropdata, parent: parentRef.current, image: imageRef.current})

        setCropboxStyle(cropStyles.cropbox)
        setImageCropStyle(cropStyles.image)

    }

    useEffect(() => {
        getImage()
    }, [imageRef.current])

    useEffect(() => {
        getImageFilters()
    }, [imageFilters])

    useEffect(() => {
        getImageCrop()
    }, [imageCropdata, imageLoaded, width, height])

    const imageStyle = {
        ...imageFiltersStyle,
        ...imageCropStyle
    }

    const renderDebug = () => {
        return (
            <ul className={classes.debug}>
                <li>parent {parentWidth}x{parentHeight}</li>
                <li>image {imageWidth}x{imageHeight}</li>
                <li>crop {cropWidth}x{cropHeight}</li>
            </ul>
        )
    }
    
    return (
        <div className={className || classes.root} ref={parentRef} data-loaded={imageLoaded}>
            <div className={classes.cropbox} ref={cropboxRef} style={cropboxStyle}>
                <img className={classes.image} src={imageUrl} ref={imageRef} style={imageStyle} onClick={onClick} />
                { children }
            </div>
            { renderDebug() }
        </div>
    )

}

export default withResizeDetector(ImageBase);