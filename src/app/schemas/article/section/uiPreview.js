export default {
    "select": {
        "title": "title",
        "untitled": "untitled",
        "description": "description"
    },
    prepare({formData, formContext}) {
        const localeId = "locale:no"
        const title = formData.title && formData.title[localeId]

        const sectionType = formData.sectionType
        const untitled = "Untitled " + sectionType

        const { bodytext, media, references, links, attachments, cite, quote } = formData

        let description;

        if (sectionType === "text") {
            description = bodytext && bodytext[localeId]
        }

        if (sectionType === "media") {
            description = media && media.length + " media"
        }

        if (sectionType === "dm") {
            description = references && references.length + " referanser"
        }

        if (sectionType === "links") {
            description = links && links.length + " lenker"
        }

        if (sectionType === "attachments") {
            description = attachments && attachments.length + " vedlegg"
        }

        if (sectionType === "quote") {
            description = []

            cite && description.push(cite)
            quote && quote[localeId] && description.push(quote[localeId])

            description = description.join(": ")
        }

        return {
            title: title,
            untitled: untitled,
            description: description
        }

    }
}