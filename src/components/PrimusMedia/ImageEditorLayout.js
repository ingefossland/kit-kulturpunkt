import React, { useState } from 'react';
import ImageEditorToolbar from "./ImageEditorToolbar"
import ImageEditorNavigation from "./ImageEditorNavigation"

import ImagePreview from "./ImagePreview"
import ImageAnnotations from "./ImageAnnotations"
import ImageCropper from "./ImageCropper"


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    media: {
        backgroundColor: theme.palette.background.default,
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
    },
    split: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
    },
    view: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    edit: {
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        flexBasis: 480,

        display: "none",
        
        "&[aria-expanded=true]": {
            display: "block"
        },
    
    },
    canvas: {
        position: "relative",
        width: "100%",
        flexBasis: "100%",
        flexGrow: 1,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
}));

const ImageEditorField = ({
    expanded = true,
    toolbar,
    action,
    imageUrl,
    imageAnnotations = [],
    onAnnotationsChange,
    imageCropdata = {},
    onCropChange,
    items = [],
    currentIndex,
    onSelectIndex,
    transform = {},
    onTransformChange,
    children,
    ...props
}) => {

    const classes = useStyles();

    if (!expanded) {
        return false
    }

    const ImageTemplate = () => {


        if (action === "imageCropdata") {
            return (
                <ImageCropper imageUrl={imageUrl} imageCropdata={imageCropdata} onChange={onCropChange} />
            )
        }

        if (action === "imageAnnotations") {
            return (
                <ImageAnnotations imageUrl={imageUrl} imageAnnotations={imageAnnotations} onChange={onAnnotationsChange} />
            )
        }

        return (
            <ImagePreview imageUrl={imageUrl} transform={transform} onTransformChange={onTransformChange} />
        )
        
    }

    let editorExpanded = true

    if (action === "preview") {
        editorExpanded = false
    }

    return (
        <div className={classes.media}>
            <div className={classes.split}>
                <div className={classes.view}>
                    <ImageEditorToolbar toolbar={toolbar} action={action} classes={classes.toolbar} />
                    <div className={classes.canvas}>
                        <ImageTemplate />
                    </div>
                    <ImageEditorNavigation items={items} onSelectIndex={onSelectIndex} />
                </div>

                <div className={classes.edit} aria-expanded={editorExpanded}>
                    {children}
                </div>
            </div>
        </div>
    )

}

export default ImageEditorField;