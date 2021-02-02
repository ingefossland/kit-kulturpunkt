import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    item: {
        backgroundColor: "white",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",

        padding: 36,

    },
    media: {
        backgroundColor: "#333",
        width: "100%",
        height: 360,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    header: {
        width: "100%",
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 27,
        lineHeight: 1
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        fontWeight: "normal"
    },
}));

const PreviewObject = ({expanded, imageUrl, title, artist, onClick}) => {

    const classes = useStyles()

    return (
        <article className={classes.item} onClick={onClick}>
            <header className={classes.header}>
                <h1 className={classes.title}>{title}</h1>
                <h2 className={classes.description}>{artist}</h2>
            </header>

            <div className={classes.media}>
                <img src={imageUrl} className={classes.image} />
            </div>
        </article>
    )


}

export default PreviewObject;