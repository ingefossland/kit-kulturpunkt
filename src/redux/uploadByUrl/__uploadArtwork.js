import { API } from '../settings';
import { getUploadModel, uploadFile } from "./upload"
import { requestUploadArtwork, receiveUploadArtwork } from "../actions/upload"


export const uploadArtwork = ({parentFile, parentData, parentCallback, artworkFiles = [], ...props}) => {

    console.log('uploadArtwork', artworkFiles)

    const artworkData = {
        collectionId: parentData && parentData.collectionId,
        parentId: parentData && parentData.id,
        title: "Artwork",
        status: "upload",
        mediaType: "artwork"
    }

    console.log('artworkData', artworkData)

    const handleUpload = ({parentFile, parentData, parentCallback, model, file, ...props}) => {

        const { uploadUrl } = model
        uploadFile({uploadUrl, file})

        const artwork = [{
            mediaId: model.uniqueId,
            media: model
        }]

        parentData = {
            ...parentData,
            artworkFiles: undefined,
            content: {
                ...parentData.content,
                artwork: artwork
            }
        }

        getUploadModel({file: parentFile, uploadData: parentData, callback: parentCallback, ...props})

    }

    artworkFiles && artworkFiles.map((file, index) => {
        getUploadModel({file, uploadData: artworkData, callback: (props) => handleUpload(props), 
            parentFile, parentData, parentCallback, ...props})
    })

}
