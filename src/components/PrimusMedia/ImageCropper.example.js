import React, { useState } from 'react';
import ImageCropper from "./ImageCropper"
import ImageBase from "./ImageBase"
import EditorLayout from "../Editor/EditorLayout"

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    preview: {
        display: "flex",
        width: "100%",

        "& > *": {
            margin: theme.spacing(1)
        }

    },
    square: {
        position: "relative",
        backgroundColor: "blue",
        paddingBottom: "100%",
        overflow: "hidden"
    },
    landscape: {
        position: "relative",
        backgroundColor: "blue",
        paddingBottom: "50%",
        overflow: "hidden"
    },
    portrait: {
        position: "relative",
        backgroundColor: "blue",
        paddingBottom: "150%",
        overflow: "hidden"
    }
}));

const CropperDebug = ({formData}) => {

    if (!formData) {
        return false
    }

    return (
        <ul>
            <li>top:  {formData.top}</li>
            <li>right:  {formData.right}</li>
            <li>bottom:  {formData.bottom}</li>
            <li>left: {formData.left}</li>
            <li>x: {formData.x}</li>
            <li>y: {formData.y}</li>
            <li>width: {formData.width}</li>
            <li>height: {formData.height}</li>
            <li>rotate: {formData.rotate}</li>
        </ul>
    )

}

const ExampleCropper = ({imageUrl = undefined, imageCropdata = {}}) => {

    const classes = useStyles()

    const [formData, setFormData] = useState(imageCropdata)

    const onChange = (formData) => {
        setFormData(formData)
    }

    const CropperPreview = () => (
        <div className={classes.preview}>
            <div>
                square
                <ImageBase className={classes.square} imageUrl={imageUrl} imageCropdata={formData} />
                square/cover
                <ImageBase className={classes.square} imageUrl={imageUrl} imageCropdata={formData} objectFit="cover" />
            </div>
            <div>
                landscape
                <ImageBase className={classes.landscape} imageUrl={imageUrl} imageCropdata={formData} />
                landscape/cover
                <ImageBase className={classes.landscape} imageUrl={imageUrl} imageCropdata={formData} objectFit="cover" />
            </div>
            <div>
                portrait
                <ImageBase className={classes.portrait} imageUrl={imageUrl} imageCropdata={formData} />
                portrait/cover
                <ImageBase className={classes.portrait} imageUrl={imageUrl} imageCropdata={formData} objectFit="cover" />
            </div>
        </div>
    )

    return (
        <EditorLayout
            title="ImageCropper"
            preview={{
                children: <CropperPreview />
            }}
            >
                <ImageCropper imageUrl={imageUrl} imageCropdata={formData} onChange={(formData) => onChange(formData)} />
        </EditorLayout>
    )

}

export default ExampleCropper;