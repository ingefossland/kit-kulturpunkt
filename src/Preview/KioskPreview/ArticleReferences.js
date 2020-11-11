import React from "react"
import LayoutGrid from "./LayoutGrid"
import ModuleEkultur from "./ModuleEkultur"

const layouts = {
    "grid": LayoutGrid
}

const templates = {
    "ekultur": ModuleEkultur
}

const ArticleReferences = ({className, language = "no", layout = "grid", references = []}) => {
    const localeId = "locale:" + language;

    const renderReference = ({referenceType, reference, content}) => {
        let title = content && content.title || reference && reference.title || undefined

        if (typeof title === "object") {
            title = title[localeId] || undefined
        }

        const ModuleTemplate = referenceType && templates[referenceType]

        if (ModuleTemplate) {
            return (
                <ModuleTemplate {...reference} title={title} />
            )
        }

        return (
            <li>{title}</li>
        )
    
    }
        

    if (!references.length) {
        return false
    }

    const LayoutTemplate = layout && layouts[layout]

    if (LayoutTemplate) {
        return (
            <LayoutTemplate>
                { references.map(reference => renderReference(reference))}
            </LayoutTemplate>
        )
    }

    return (
        <div className={className}>
            { references.map(reference => renderReference(reference))}
        </div>
    )

}

export default ArticleReferences