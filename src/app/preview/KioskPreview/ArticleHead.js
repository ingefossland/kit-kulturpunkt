import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import ArticleGrid from "./ArticleGrid"
import ArticleTitle from "./ArticleTitle"
import ArticleBodytext from "./ArticleBodytext"
import ArticleMedia from "./ArticleMedia"
import ArticleReferences from "./ArticleReferences"
import ArticleLinks from "./ArticleLinks"

const useStyles = makeStyles(theme => ({
    head: {

    }
}));

const ArticleHead = ({className, language, title, leadtext, media}) => {

    const classes = useStyles()

    return (
        <header className={className || classes.head}>
           <ArticleGrid>
                <ArticleTitle language={language}>{title}</ArticleTitle>

                { media && 
                    <ArticleMedia media={media} layout="list" mediaFormat="2:1" />
                }

                <ArticleBodytext language={language}>{leadtext}</ArticleBodytext>
            </ArticleGrid>
        </header>
    )
}

export default ArticleHead