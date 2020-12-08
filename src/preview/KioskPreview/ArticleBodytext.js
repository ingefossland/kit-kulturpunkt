import React from "react"
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    bodytext: {
        "& p": {
            margin: "1em 0"
        },

        "& ul": {
            listStyle: "disc",
            margin: "1em 0"
        },

        "& ol": {
            listStyle: "upper-roman",
            margin: "1em 0"
        },

        "& strong": {
            fontWeight: "bold"
        },
        "& em": {
            fontStyle: "italic"
        }
    },
}));

const ArticleBodytext = ({className, language = "no", children}) => {
    const localeId = "locale:" + language;
    const classes = useStyles()
        
    if (typeof children === "object") {
        children = children[localeId] || undefined
    }

    return (
        <ReactMarkdown className={className || classes.bodytext} source={children} />             
    )
}

export default ArticleBodytext