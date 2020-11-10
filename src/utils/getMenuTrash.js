export function getMenuTrash({query, documentTypes = [], ...props}) {

    return {
        ...props,
        icon: "delete",
        query: {
//            ...query,
            models: "documents",
            status: "trash",
            models: "documents",
            sort: "deletedAt DESC",
        }
    }

}

export default getMenuTrash