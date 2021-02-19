import React, { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import CropIcon from '@material-ui/icons/Crop';

import { makeStyles } from '@material-ui/core/styles';

import ImageCropperBase from "./ImageCropperBase"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    cropper: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        marginBottom: theme.spacing(6),

        "& .cropper-container": {
            backgroundImage: "none"
        },
        "& .cropper-modal": {
            backgroundColor: "inherit"
        }
    },
    footer: {
        position: "absolute",
        top: "auto",
        right: 0,
        left: 0,
        bottom: 0,
        height: theme.spacing(6),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "none",
        textAlign: "center",
        minWidth: theme.spacing(5),
        color: "inherit",
        "&[aria-selected=true]": {
            color: theme.palette.primary.main
        }
    },
    icon: {
        fontSize: "16px"
    }
}));


const ImageCropper = ({className, imageUrl, imageCropdata = {}, formats, onChange, ...props}) => {
    const classes = useStyles()

    const _onChange = (imageCropdata) => {
        onChange && onChange(imageCropdata)
    }

    const [formatSelected, setFormatSelected] = useState(null)
    const [aspectRatio, setAspectRatio] = useState(null)

    const resetFormat = () => {
        setFormatSelected(null)
        setAspectRatio(null)
    }

    const handleFormat = (format) => {
        const ratio = format.split(':')

        setFormatSelected(format)
        setAspectRatio(ratio[0]/ratio[1])
    }

    return (
        <div className={className || classes.root}>
            <ImageCropperBase className={classes.cropper} imageUrl={imageUrl} imageCropdata={imageCropdata} aspectRatio={aspectRatio} onChange={_onChange} />
            <footer className={classes.footer}>
                    <ButtonBase className={classes.button} aria-selected={!formatSelected} onClick={() => resetFormat(undefined)}><CropIcon className={classes.icon} /></ButtonBase>
                        { formats && formats.map((format, index) => {
                        return (
                            <ButtonBase aria-selected={formatSelected === format} className={classes.button} size="small" onClick={() => handleFormat(format)}>{format}</ButtonBase>
                        )
                    })}
            </footer>
        </div>
    )

}

ImageCropper.defaultProps = {
    imageUrl: undefined,
    /* ImageCropdata defined as percentages */
    imageCropdata: {
        "x": 0,
        "y": 0,
        "width": undefined,
        "height": undefined,
        "rotate": 0
    },
    formats: [
        "16:9",
        "4:3",
        "3:2",
        "1:1",
        "2:3"
    ]
}

export default ImageCropper;