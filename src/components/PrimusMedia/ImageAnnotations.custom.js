import React, { useState } from 'react';

import ImageAnnotations from "./ImageAnnotations"
import ImagePreview from "./ImagePreview"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    header: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: "50%",
        left: 0
    },
    footer: {
        position: "absolute",
        top: "50%",
        right: 0,
        bottom: 0,
        left: 0
    },
    image: {
        position: "absolute",
        top: 0,
        right: "50%",
        bottom: 0,
        left: 0
    },
    preview: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: "50%"
    }
}));

const CustomMarker = ({index, top, left}) => {
    return (
        <div style={{backgroundColor: "red", color: "white", padding: "1em", position: "absolute", top: top + "%", left: left + "%"}}>
            {index}
        </div>
    )
}

const ExampleAnnotations = ({imageUrl = undefined, imageAnnotations = []}) => {

    const classes = useStyles()

    /*

    const [formData, setFormData] = useState(imageAnnotations)

    const onChange = (formData) => {
        setFormData(formData)
    }

    */

    return (
        <ImageAnnotations imageUrl={imageUrl} imageAnnotations={imageAnnotations} markerTemplate={CustomMarker} />
    )

}

export default ExampleAnnotations;