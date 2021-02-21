import { getSchemaModel, getUiPreview } from "./"

export const getUiModel = ({model, modelsById = {}, t}) => {

    const { source, sourceId, status, documentType, mediaType } = model;

    const uniqueId = model.uniqueId || source + "/" + sourceId
    const uniqueModel = modelsById[uniqueId] || {}

    const { schema, uiSchema } = getSchemaModel(model)

    const uiPreview = uiSchema && getUiPreview({schema, uiSchema, formData: uniqueModel}) || {}
    
    // labels

    const statusLabel = status && t('status:'+status)
    const documentLabel = documentType && t('documentType:'+documentType)
    const mediaLabel = mediaType && t('mediaType:'+mediaType)

    const uiLabels = {
        documentLabel: documentLabel,
        mediaLabel: mediaLabel,
        statusLabel: statusLabel
    }    

    return {
        ...uniqueModel,
        ...model,
        ...uiPreview,
        ...uiLabels,
        uniqueId: uniqueId,
    }    

}