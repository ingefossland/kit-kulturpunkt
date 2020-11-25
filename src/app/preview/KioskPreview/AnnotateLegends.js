import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageAnnotationsBase } from "@kit-ui/admin"
import PageHeader from "./PageHeader"
import { getPreviewItem } from "./utils"

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
//        margin: "6em 1em"
    },
    line: {
        position: "absolute",
        zIndex: props => { return props.zIndex },
        top: props => { return props.top + "%" || "50%"},
        right: props => { return props.left <= 50 && 100-props.left + "%" || "0" },
        left: props => { return props.left > 50 && props.left + "%" || "0" },
        height: "2px",
        backgroundColor: "white"
    },
    module: {
        position: "absolute",
        transform: "translateY(-50%)",
        zIndex: props => { return props.zIndex },
        top: props => { return props.top + "%" || "50%"},
        right: props => { return props.left > 50 && "0" },
        left: props => { return props.left <= 50 && "0" },
        width: "12em",
        backgroundColor: "white",
        color: "black",
        padding: "1em"
    },
    marker: {
        position: "absolute",
        zIndex: props => { return props.zIndex },
        top: props => { return props.top + "%" || "50%"},
        left: props => { return props.left + "%" || "50%"},
    },
    border: {
        width: "1.5em",
        height: "1.5em",
        backgroundColor: "white",
        display: "block",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        padding: ".25em"
    },
    label: {
        width: "100%",
        height: "100%",
        backgroundColor: props => { return props.color },
        color: "transparent",
        borderRadius: "50%",
    },
}));

const ImagelegendPreview = ({formData = {}, formContext}) => {
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

    if (!imageUrl) {
        return (
            <p>No imageUrl</p>
        )
    }

    const MarkerModule = ({id, index, top = 50, left = 50, size = 4, runningHead, title, description, ...props}) => {
        const classes = useStyles({size, zIndex: index, top, left})

        return (
            <div className={classes.module} data-index={index} onClick={() => onCurrentId(id)}>
                { runningHead && <h3>{runningHead}</h3> }
                <h2>{title}</h2>
                {description && <p>{description}</p> }
            </div>
        )

    }

    const MarkerTemplate = ({id, index, top = 50, left = 50, size = 4, ...props}) => {
        const classes = useStyles({size, zIndex: index, top, left, color: annotateColor})

        return (
            <React.Fragment>
                <div className={classes.line} data-index={index}></div>
                <div className={classes.marker} onClick={() => onCurrentId(id)}>
                    <div className={classes.border}>
                        <div className={classes.label}>
                            {index+1}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    
    return (
        <div className={classes.root}>
            <PageHeader title={title} position="absolute" />
            <div className={classes.body}>
                <ImageAnnotationsBase imageUrl={imageUrl} imageFilters={imageFilters} imageAnnotations={imageAnnotations} overflow="visible" markerTemplate={MarkerTemplate} />
                { imageAnnotations && imageAnnotations.map((item, index) => {
                    const itemProps = getPreviewItem({...item, index: index, localeId: localeId})
                    return (
                        <MarkerModule {...itemProps} key={index} />
                    )
                })}
            </div>
        </div>
    )

}


export default ImagelegendPreview;