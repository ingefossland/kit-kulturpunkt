import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}));

const ImageCropperBase = ({className, imageUrl, imageCropdata, options, aspectRatio, onChange}) => {
    const classes = useStyles()
    const cropperRef = useRef(null);

    if (!imageUrl) {
        return (
            <p>No imageUrl for cropper</p>
        )
    }

    const onReady = () => {

        const currentImage = cropperRef && cropperRef.current

        if (!currentImage) {
            return
        }

        const image = cropperRef && cropperRef.current && cropperRef.current.getImageData();
        const imageWidth = image && image.naturalWidth
        const imageHeight = image && image.naturalHeight

        const x = imageCropdata && imageCropdata.x * imageWidth / 100 || 0
        const y = imageCropdata && imageCropdata.y * imageHeight / 100 || 0
        const width = imageCropdata && imageCropdata.width * imageWidth / 100 || imageWidth
        const height = imageCropdata && imageCropdata.height * imageHeight / 100  || imageHeight

        cropperRef.current.setData({
            ...imageCropdata,
            x: x,
            y: y,
            width: width,
            height: height
        });

//        cropperRef.current.setData(imageCropdata);
    }

    const onCrop = () => {
        const data = cropperRef.current.getData();
        const image = cropperRef.current.getImageData();

        const imageWidth = image && image.naturalWidth
        const imageHeight = image && image.naturalHeight

        const x = data.x / imageWidth * 100
        const y = data.y / imageHeight * 100

        const width = data.width / imageWidth * 100
        const height = data.height / imageHeight * 100

        const newFormData = {
            ...data,
            x: x,
            y: y,
            width: width,
            height: height,
        }

        onChange && onChange(newFormData)

    }

    options = {
        ...options,
        aspectRatio: aspectRatio
    }

    return (
        <Cropper
            className={className || classes.root}
            ref={cropperRef}
            src={imageUrl}
            {...options}
            ready={onReady.bind(this)}
            crop={onCrop.bind(this)} />
    )

}

ImageCropperBase.propTypes = {
    imageUrl: PropTypes.string
}

ImageCropperBase.defaultProps = {
    imageUrl: undefined,
    options: {
        viewMode: 0,
        dragMode: "crop",
        initialAspectRatio: undefined,
        aspectRatio: undefined,
        responsive: true,
        restore: true,
        checkCrossOrigin: false,
        checkOrientation: true,
        modal: true,
        guides: true,
        center: true,
        highlight: true,
        background: true,
        autoCrop: true,
        autoCropArea: 1,
        movable: true,
        rotatable: true,
        scalable: true,
        zoomable: true,
        zoomOnTouch: true,
        zoomOnWheel: true,
        wheelZoomRatio: 0.1,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true
    },
    imageCropdata: {
        "x": undefined,
        "y": undefined,
        "width": undefined,
        "height": undefined,
        "rotate": undefined
    }
}

export default ImageCropperBase;