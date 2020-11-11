import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    article: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        margin: theme.spacing(1),
        overflowY: "scroll",

        "& *": {
            boxSizing: "border-box"
        },

        backgroundColor: "white",
        fontFamily: "Akkurat, sans-serif",
        lineHeight: 1.5,

        "& h1": {
            fontSize: "1.5em",
            fontWeight: "bold",
            lineHeight: 1.25,
            margin: ".5em 0"
        },

        "& h2": {
            fontSize: "1.25em",
            fontWeight: "bold",
            lineHeight: 1.25,
            margin: ".5em 0"
        },

    }
}));

const ArticleBase = ({className, children}) => {
    const classes = useStyles()
    return (
        <article className={className || classes.article}>
            {children}
        </article>
    )
}

export default ArticleBase