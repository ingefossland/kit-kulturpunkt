import React from "react"

import ArticleBase from "./ArticleBase"
import ArticleHead from "./ArticleHead"
import ArticleBody from "./ArticleBody"
import ArticleSection from "./ArticleSection"

const Article = ({formData, formContext}) => {
    const language = formContext.currentLocale || formContext.defaultLocale || formData.locale
    const content = formData && formData.content;

    const { title, leadtext, headerImage, sections } = content;

    return (
        <ArticleBase>
            <ArticleHead language={language} title={title} leadtext={leadtext} media={headerImage && [headerImage]} />
            <ArticleBody>
                { sections && sections.map((section, index) => <ArticleSection {...section} language={language} /> )}
            </ArticleBody>
        </ArticleBase>
    )

}

Article.defaultProps = {
    formData: {},
    formContext: {}
}

export default Article