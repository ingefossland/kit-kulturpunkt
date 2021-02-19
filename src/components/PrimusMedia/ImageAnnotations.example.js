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

const ExampleAnnotations = ({imageUrl = undefined, imageAnnotations = []}) => {

    const classes = useStyles()

    const [formData, setFormData] = useState(imageAnnotations)

    const onChange = (formData) => {
        setFormData(formData)
    }

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <div className={classes.image}>
                    <ImageAnnotations imageUrl={imageUrl} imageAnnotations={formData} onChange={(formData) => onChange(formData)} />
                </div>
                <div className={classes.preview}>
                    <ImagePreview imageUrl={imageUrl} imageAnnotations={formData} />
                </div>
            </header>
            <footer className={classes.footer}>
                {JSON.stringify(formData)}
            </footer>
        </div>
    )

}

export default ExampleAnnotations;