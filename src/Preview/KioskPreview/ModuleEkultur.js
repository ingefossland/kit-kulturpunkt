import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: "100%",
//        minHeight: "240px",
        backgroundColor: "#f2f2f2",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "13px",
        lineHeight: 1.5,
        display: "flex",
        flexDirection: "column",
    },
    media: {
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
        flexBasis: 0,
        flexGrow: 1,
        margin: 0
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxWidth: "90%",
        maxHeight: "90%",
        margin: "auto"
    },
    content: {
        flexBasis: 0,
        flexGrow: 1,
        padding: theme.spacing(.5),
        minHeight: "5em"
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "1em",
        lineHeight: 1.25,
        maxHeight: "3.75em",
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
    },
    footer: {
        flexBasis: 0,
        flexGrow: 0
    }
}));

const ModuleEkultur = ({size, documentType, imageUrl, title, author, objectCount, imageCount, videoCount, audioCount, commentCount}) => {
    const classes = useStyles()

    let metadata = [];

    if (objectCount) {
      metadata.push(objectCount + ' objekter'); 
    }
    
    if (imageCount) {
      metadata.push(imageCount + ' bilder'); 
    }

    if (videoCount) {
      metadata.push(videoCount + ' videoer'); 
    }

    if (audioCount) {
      metadata.push(audioCount + ' lydklipp'); 
    }
    
    metadata = metadata.length && metadata.join(', ');    

    return (
        <article className={classes.module}>
            <figure className={classes.media}>
                <img className={classes.image} src={ imageUrl } />
            </figure>
            <div className={classes.content}>
                <header className={classes.header}>
                    <Typography className={classes.title}>{title}</Typography>
                </header>
                <footer className={classes.footer}>
                    <p></p>
                    <b className="comments__label">{ commentCount }</b>
                </footer>
            </div>
        </article>
    )

}


export default ModuleEkultur;