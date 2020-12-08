import React from "react"
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    leadtext: {
        "& strong": {
            fontWeight: "bold"
        },
        "& em": {
            fontStyle: "italic"
        }
    },
}));

const ArticleLeadtext = ({className, language = "no", children}) => {
    const localeId = "locale:" + language;
    const classes = useStyles()
        
    if (typeof children === "object") {
        children = children[localeId] || undefined
    }

    return (
        <ReactMarkdown className={className || classes.leadtext} source={children} />             
    )
}

export default ArticleLeadtext