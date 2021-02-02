import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        fontFamily: "Akkurat, sans-serif",

        "&.h1": {
            fontSize: "1.5em",
            fontWeight: "bold",
            lineHeight: 1.25,
            margin: ".5em 0"
        },

        "&.h2": {
            fontSize: "1.25em",
            fontWeight: "bold",
            lineHeight: 1.25,
            margin: ".5em 0"
        },

    },
}));

const ArticleTitle = ({className, component = "h1", language = "no", children}) => {

    const classes = useStyles()

    const localeId = "locale:" + language;
        
    if (typeof children === "object") {
        children = children[localeId] || undefined
    }

    return (
        <Typography className={className || classes.title} component={component}>{children}</Typography    >
    )
}

export default ArticleTitle