import React from 'react';
import Typography from '@material-ui/core/Typography';
import LayoutFormat from "./LayoutFormat"
import { MediaPreview } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: "100%",
//        paddingBotton: "100%",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "13px",
        lineHeight: 1.5,
        display: "flex",
        flexDirection: "column",
    },
    media: {
        backgroundColor: "grey",
        position: "relative",
        width: "100%"
    },
    content: {
        fontFamily: "Akkurat, sans-serif",
        marginTop: ".25em",
    },
    caption: {
    },
    headline: {
        fontWeight: "bold",
    },
    byline: {
        fontStyle: "italic"
    },
    license: {
        
    }
}));

const ModuleMedia = ({mediaType, mediaFormat = "1:1", imageUrl, headline, caption, byline, license, ...props}) => {
    const classes = useStyles()

    return (
        <article className={classes.module}>
            <figure className={classes.media}>
                <LayoutFormat format={mediaFormat}>
                    <MediaPreview mediaType={mediaType} imageUrl={imageUrl} {...props} />
                </LayoutFormat>
            </figure>
            <Typography component="figcaption" className={classes.content}>
                {headline && <strong className={classes.headline}>{headline}:</strong>}
                {headline && " "}
                {caption && <span className={classes.caption}>{caption}</span>}
                {byline && " "}
                {byline && <em className={classes.byline}>({byline})</em>}
                {license && " "}
                {license && <em className={classes.license}>{license}</em>}
            </Typography>
        </article>
    )

}


export default ModuleMedia;