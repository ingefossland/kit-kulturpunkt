export function getMenuLatest({query, ...props}) {

    return {
        ...props,
        icon: "access_time",
        query: {
            ...query,
            models: "documents",
            status: "NOT trash",
            models: "documents",
            sort: "updatedAt DESC"
        }
    }

}

export default getMenuLatest