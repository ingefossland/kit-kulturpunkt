import { getUiPreview } from "./getUiPreview"
import { schemasByName } from "../schemas"

export const getUiModel = ({model, modelsById = {}, bulkItems = []}) => {

    const { modelName, source, sourceId } = model;

    const uniqueId = model.uniqueId || source + "/" + sourceId

    // uniqueItem

    const uniqueModel = modelsById[uniqueId] || {}

    // uiPreview

    const documentType = uniqueModel && uniqueModel.documentType || model.documentType
    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]

    const mediaType = uniqueModel && uniqueModel.mediaType || model.mediaType
    const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]

    const collectionType = uniqueModel && uniqueModel.collectionType || model.collectionType
    const collectionModel = collectionType && schemasByName && schemasByName["collections/" + collectionType]
    
    const schemaModel = documentModel || mediaModel || collectionModel

    const uiPreview = schemaModel && uniqueModel.uniqueId && getUiPreview({...schemaModel, formData: uniqueModel}) || {}
    
    return {
        ...model,
        ...uniqueModel,
        ...uiPreview,
        uniqueId: uniqueId,
        selected: bulkItems.includes(uniqueId),
    }    

}