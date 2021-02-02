import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    article: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        minWidth: 360,
        minHeight: 360,
        padding: 36,
        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
    },
}));

const ArticleBase = ({children, onClick}) => {

    const classes = useStyles()

    return (
        <article className={classes.article} onClick={onClick}>
            {children}
        </article>
    )


}

export default ArticleBase;