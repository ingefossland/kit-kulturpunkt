import { 
    getUpload, 
    generateKeyedFormData, 
    keyedToPlainFormData
 } from "./"

export const getUploadProps = ({formData, formContext, onChange}) => {

    const { id, collectionId } = formContext;

    let media = []

    formData.content.images && formData.content.images.map(item => {
        media.push(item)
    })

    let keyedMedia = generateKeyedFormData(media || [])

//    let keyedMedia = generateKeyedFormData(formData.content.media || [])

    const _onUploadChange = (media = []) => {

        const images = media.filter(item => item.media.mediaType === "image") || []
        const attachments = media.filter(item => item.media.mediaType !== "image") || []

        onChange({
            ...formData,
            content: {
                ...formData.content,
                media: media,
                attachments: attachments,
                images: images
            }
        })
    }

    const _onUploadAdd = ({uniqueId, ...media}) => {

        const newKeyedMediaRow = {
            key: uniqueId,
            item: {
                mediaId: uniqueId,
                media: {
                    ...media,
                    uniqueId: uniqueId,
                    uploadProgress: 0
                }
            },
        };

        keyedMedia = [...keyedMedia, newKeyedMediaRow];
        _onUploadChange(keyedToPlainFormData(keyedMedia))
    }

    const _onUploadProgress = ({uniqueId, uploadProgress}) => {

        const media = keyedMedia[uniqueId]

        keyedMedia[uniqueId] = {
            ...keyedMedia[uniqueId],
            media: {
                ...media,
                uploadProgress: uploadProgress
            }
        }

        console.log('uploadProgress', uploadProgress)

        _onUploadChange(keyedToPlainFormData(keyedMedia))

    }

    const _onUpload = (acceptedFiles) => {

        console.log('upload', acceptedFiles)

        const uploadData = {
            parentId: id,
            collectionId: collectionId,
            status: "upload"
        }

        acceptedFiles && acceptedFiles.map((file, index) => {
            getUpload({file, uploadData, onAdd: _onUploadAdd, onProgress: _onUploadProgress})
        })
    
    }        

    return {
        _onUpload: _onUpload
    }



}