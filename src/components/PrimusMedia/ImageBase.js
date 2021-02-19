import React, { useRef, useState, useEffect } from 'react';
import { withResizeDetector } from 'react-resize-detector';
import { makeStyles } from '@material-ui/core/styles';
import { getImageStyles } from "./utils/getImageStyles"

const useStyles = makeStyles(theme => ({
    imageBase: {
        width: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden"
    },
    cropbox: {
        position: "absolute",
        overflow: props => { return props.overflow },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "auto"
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
    }
}));

const ImageBase = ({className, style, imageUrl, imageCropdata, imageFocalpoint, imageFilters, objectFit = "contain", position = "absolute", overflow = "hidden", children, width, height, onLoad, onClick}) => {
    const parentRef = useRef(null)
    const cropboxRef = useRef(null)
    const imageRef = useRef(null)

    const classes = useStyles({overflow})

    const [imageLoaded, setImageLoaded] = useState(false)

    const imageWidth = imageRef && imageRef.current && imageRef.current.offsetWidth;
    const imageHeight = imageRef && imageRef.current && imageRef.current.offsetHeight;

    const parentWidth = parentRef && parentRef.current && parentRef.current.offsetWidth;
    const parentHeight = parentRef && parentRef.current && parentRef.current.offsetHeight;

    const cropboxWidth = cropboxRef && cropboxRef.current && cropboxRef.current.offsetWidth;
    const cropboxHeight = cropboxRef && cropboxRef.current && cropboxRef.current.offsetHeight;

    const handleLoad = () => {
        setImageLoaded(true)

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
    
    }

    // get styles
    const [cropboxStyle, setCropboxStyle] = useState(null)
    const [imageStyle, setImageStyle] = useState(null)

    useEffect(() => {

        if (!imageRef.current || !parentRef.current) {
            return
        }
    
        const cropStyles = getImageStyles({
            imageCropdata,
            imageFocalpoint,
            imageFilters,
            objectFit,
            parentRef: parentRef, 
            imageRef: imageRef
        })
    
        setCropboxStyle(cropStyles.cropbox)
        setImageStyle(cropStyles.image)

    }, [width, height, imageCropdata, imageFilters, imageLoaded])

    // return cropped image with styles

    return (
        <div className={className || classes.imageBase} ref={parentRef}>
            <div className={classes.cropbox} ref={cropboxRef} style={cropboxStyle} onClick={onClick}>
                    <img src={imageUrl} className={classes.image} ref={imageRef} style={imageStyle} onLoad={handleLoad} />
                {children}
            </div>
        </div>
    )

}

ImageBase.defaultProps = {
    imageCropdata: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    }
}

export default withResizeDetector(ImageBase);