import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    media: {
        backgroundColor: "#333",
        width: "100%",
        height: 360,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.5em",
        marginBottom: "1.5em"
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
}));

const ArticleMedia = ({items = []}) => {

    const classes = useStyles()

    if (!items.length) {
        return false
    }

    return (
        <div className={classes.media}>
            <img src={items[0].imageUrl} className={classes.image} />
        </div>
    )


}

export default ArticleMedia;