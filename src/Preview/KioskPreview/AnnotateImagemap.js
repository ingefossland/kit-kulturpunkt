import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageAnnotationsBase } from "@kit-ui/admin"
import PageHeader from "./PageHeader"
import { getPreviewItem, getContrastColor } from "./utils"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    body: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
//        margin: "6em"
    },
    marker: {
        position: "absolute",
        zIndex: props => { return props.zIndex },
        top: props => { return props.top + "%" || "50%"},
        left: props => { return props.left + "%" || "50%"},
    },
    label: {
        width: props => { return theme.spacing(props.size) },
        height: props => { return theme.spacing(props.size) },
        top: "0",
        left: "0",
        position: "absolute",
        display: "block",
        transform: "translate(-50%, -50%)",
        backgroundColor: props => { return props.backgroundColor },
        color: props => { return props.color },
        borderSize: ".25em",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Akkurat Mono, monspace",
        fontSize: "14px",
    }
}));

const ImagemapPreview = ({formData = {}, formContext}) => {
    const locale = formContext && formContext.currentLocale || formContext && formContext.defaultLocale;
    const localeId = "locale:"+locale
    const onCurrentId = formContext.onCurrentId

    const contentTitle = formData && formData.content && formData.content.title;
    const title = contentTitle && contentTitle[localeId] || formData.title

    const classes = useStyles()

    const annotateImage = formData.content && formData.content.backgroundImage;
    const annotateColor = formData.content && formData.content.annotateColor;
    const imageAnnotations = formData && formData.content && formData.content.links
    const imageFilters = annotateImage && annotateImage.imageFilters;
    const imageUrl = annotateImage && annotateImage.media && annotateImage.media.imageUrl;

    const contrastColor = annotateColor && getContrastColor(annotateColor)

    if (!imageUrl) {
        return (
            <p>No imageUrl</p>
        )
    }

    const MarkerTemplate = ({id, index, top = 50, left = 50, size = 4}) => {

        const classes = useStyles({size, zIndex: index, top, left, backgroundColor: annotateColor, color: contrastColor})
    
        return (
            <div className={classes.marker} onClick={() => onCurrentId(id)}>
                <div className={classes.label}>
                    {index+1}
                </div>
            </div>
        )
    }
    

    return (
        <div className={classes.root}>
            <PageHeader title={title} position="absolute" />
            <div className={classes.body}>
                <ImageAnnotationsBase {...annotateImage} imageUrl={imageUrl} imageFilters={imageFilters} imageAnnotations={imageAnnotations}  markerTemplate={MarkerTemplate} />
            </div>
        </div>
    )

}


export default ImagemapPreview;