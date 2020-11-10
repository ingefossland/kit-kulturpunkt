export function getMenuSearch({query, ...props}) {

    return {
        ...props,
        query: {
            ...query,
//            models: models,
//            documentType: models === "documents" && "*"
        }
    }

}

export default getMenuSearch