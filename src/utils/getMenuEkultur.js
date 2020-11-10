export function getMenuEkultur({query, objectTypes = [], ...props}) {

    const objectTypes = query && query.objectType

    if (objectType && Array.isArray(objectType)) {
        objectTypes = objectType
    }

    const children = objectTypes && objectTypes.length > 1 && objectTypes.map(documentType => {
        return {
            pathname: objectType,
            title: objectType,
            query: {
                ...query,
                models: "ekultur",
                documentType: documentType
            }
        }
    }) || null
    
    return {
        ...props,
        children: children,
        query: {
            ...query,
            models: "ekultur",
            documentType: objectTypes && objectTypes.length === 1 && objectTypes[0] || "*",
            q: objectTypes && objectTypes.length > 1 && "objectTypes:(" + objectTypes.join(" OR ") + ")" || ""
        }
    }


}

export default getMenuEkultur