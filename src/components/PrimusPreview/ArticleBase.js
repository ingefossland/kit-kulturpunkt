import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    article: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minWidth: 360,
        minHeight: "100%",
        padding: "2em",
        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
        overflowX: "hidden",

        "& *": {
            boxSizing: "border-box"
        }
    },
}));

const ArticleBase = ({expanded = true, children, onClick}) => {

    const classes = useStyles()


    return (
        <article aria-expanded={expanded} className={classes.article} onClick={onClick}>
            {children}
        </article>
    )


}

export default ArticleBase;