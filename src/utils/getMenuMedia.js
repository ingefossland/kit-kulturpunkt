export function getMenuMedia({query = {}, mediaTypes = [], template = "media", layout, ...props}) {

    /*
    const mediaType = query && query.mediaType

    if (mediaType && Array.isArray(mediaType)) {
        mediaTypes = mediaType
    }*/

    let mediaType

    if (mediaTypes && mediaTypes.length === 1) {
        mediaType = mediaTypes[0] + "*"
    } else {
        mediaType = "*"
    }

    if (!query.status) {
        query.status = "NOT trash"
    }

    let q = []

    q.push("parentId:NOT *")
    query.q && q.push(query.q)
    mediaTypes && mediaTypes.length > 1 && q.push("mediaType:(" + mediaTypes.join(" OR ") + ")")

    q = q.join(" ")

    return {
        ...props,
        icon: "image",
        template: template,
        layout: layout,
        query: {
            ...query,
            models: "media",
            mediaType: mediaType,
            q: q,
        }
    }

}

export default getMenuMedia