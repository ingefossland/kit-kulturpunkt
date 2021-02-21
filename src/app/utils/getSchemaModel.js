import { schemasByName } from "../schemas"

export const getSchemaModel = ({documentType, mediaType, collectionType}) => {

    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType] || schemasByName["documents/page"]
    const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]
    const collectionModel = collectionType && schemasByName && schemasByName["collections/" + collectionType]
    
    const model = documentModel || mediaModel || collectionModel || {}

    return model

}