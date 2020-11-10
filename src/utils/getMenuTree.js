export function getMenuTree({query, documentTypes = [], template = "documents", ...props}) {

    const documentType = query && query.documentType

    if (documentType && Array.isArray(documentType)) {
        documentTypes = documentType
    }

    return {
        ...props,
        template: template,
        query: {
            ...query,
            models: "documents",
            documentType: documentTypes && documentTypes.length === 1 && documentTypes[0] || "*",
            q: documentTypes && documentTypes.length > 1 && "documentType:(" + documentTypes.join(" OR ") + ")" || ""
        }
    }

}

export default getMenuDocuments