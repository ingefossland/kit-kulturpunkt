import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    links: {
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

const ArticleLinks = ({className, language = "no", links = []}) => {
    const localeId = "locale:" + language;
    const classes = useStyles()

    const renderLink = ({title, url}) => {

        if (typeof title === "object") {
            title = title[localeId] || undefined
        }

        return (
            <li><a href={url}>{title}</a></li>
        )
    
    }
        

    if (!links.length) {
        return false
    }

    return (
        <div className={className || classes.links}>
            <ul>
                { links.map(link => renderLink(link))}
            </ul>
        </div>
    )

}

export default ArticleLinks