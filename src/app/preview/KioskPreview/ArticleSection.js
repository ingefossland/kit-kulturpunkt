import React from "react"
import ArticleGrid from "./ArticleGrid"
import ArticleTitle from "./ArticleTitle"
import ArticleLeadtext from "./ArticleLeadtext"
import ArticleBodytext from "./ArticleBodytext"
import ArticleMedia from "./ArticleMedia"
import ArticleReferences from "./ArticleReferences"
import ArticleLinks from "./ArticleLinks"

const ArticleSection = ({sectionType, sectionLayout, language = "no", title, leadtext, bodytext, links = [], media = [], references = []}) => {

    if (sectionType === "media") {
        return (
            <ArticleGrid>
                <ArticleTitle component="h2" language={language}>{title}</ArticleTitle>
                <ArticleMedia layout={sectionLayout} language={language} media={media} />
                <ArticleBodytext language={language}>{bodytext}</ArticleBodytext>
            </ArticleGrid>
        )
    }

    if (sectionType === "references") {
        return (
            <ArticleGrid>
                <ArticleTitle component="h2" language={language}>{title}</ArticleTitle>
                <ArticleLeadtext language={language}>{leadtext}</ArticleLeadtext>
                <ArticleReferences language={language} references={references} />
            </ArticleGrid>
        )
    }

    return (
        <ArticleGrid>
            <ArticleTitle component="h2" language={language}>{title}</ArticleTitle>
            <ArticleMedia layout={sectionLayout} language={language} media={media} />
            <ArticleLeadtext language={language}>{leadtext}</ArticleLeadtext>
            <ArticleReferences language={language} references={references} />
            <ArticleBodytext language={language}>{bodytext}</ArticleBodytext>
            <ArticleLinks language={language} links={links} />
        </ArticleGrid>
    )

}

export default ArticleSection