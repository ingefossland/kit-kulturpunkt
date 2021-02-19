import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ImageAnnotationsBase from "./ImageAnnotationsBase"
import ImageAnnotationsMarkerPrimus from "./ImageAnnotationsMarkerPrimus"

const useStyles = makeStyles(theme => ({
    root: {
//        backgroundColor: "#333",
//        color: "white",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    preview: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
//        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(6)
    },
    footer: {
        position: "absolute",
        top: "auto",
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: theme.spacing(1),
        height: theme.spacing(5),
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        textAlign: "center"
    }
}));


const ImageAnnotations = ({className, imageUrl, imageAnnotations = [], imageFocalpoint, imageCropdata, imageFilters, markerTemplate, onChange, ...props}) => {
    const classes = useStyles()

    const _onChange = (imageAnnotations) => {
        onChange && onChange(imageAnnotations)
    }

    return (
        <ImageAnnotationsBase 
            imageUrl={imageUrl}
            imageAnnotations={imageAnnotations}
//            imageCropdata={imageCropdata}
//            imageFilters={imageFilters}
//            imageFocalpoint={imageFocalpoint}
            markerTemplate={markerTemplate}
            onChange={_onChange} />
    )

    return (
        <div className={className || classes.root}>
            <div className={classes.preview}>
                <ImageAnnotationsBase 
                    imageUrl={imageUrl}
                    imageAnnotations={imageAnnotations}
                    imageCropdata={imageCropdata}
                    imageFilters={imageFilters}
                    imageFocalpoint={imageFocalpoint}
                    markerTemplate={markerTemplate}
                    onChange={_onChange} />
            </div>
            <footer className={classes.footer}>
                <Typography nowrap className={classes.description}>
                    Klikk for å legge til en markør
                </Typography>
            </footer>
        </div>
    )

}

export default ImageAnnotations;