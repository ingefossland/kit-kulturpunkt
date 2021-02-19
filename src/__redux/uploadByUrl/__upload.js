import { requestUpload, receiveUpload, requestUploadModel, receiveUploadModel, requestUploadStatus, receiveUploadStatus, receiveUploadProgress } from '../actions/upload';
import { API } from '../../redux/settings';

import { getUploadMetadata } from "./uploadMetadata"
import { getSchemaUpload } from "./uploadSchema"
import { uploadArtwork } from "./uploadArtwork"

export { 
    getUploadMetadata,
    getSchemaUpload
}

export const getUpload = ({id, session, acceptedFiles = [], uploadData = { status: "upload" }}) => {

    return function(dispatch) {
        !session && dispatch(requestUpload(id))

        acceptedFiles && acceptedFiles.map((file, index) => {

            dispatch(requestUploadModel(id))
            getUploadMetadata({id, file: file, uploadData, callback: (props) => dispatch(getUploadData(props))})
        })
    }

}

export const getUploadData = ({id, file, uploadData, ...props}) => {

    const handleStatus = (uniqueId, event) => {
        let uploadProgress;

        if (event && event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }
    
        let url = API + '/admin/api/media/upload/status/' + uniqueId
    
        return function(dispatch) {
    
            fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            })
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(data => {
                dispatch(receiveUploadStatus(uniqueId, data))
            })
    
        }

    }

    const handleProgress = (uniqueId, event) => {
        let uploadProgress;

        if (event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }
    
        return function(dispatch) {
            dispatch(receiveUploadProgress(uniqueId, uploadProgress))
        }
    
    }

    const handleUpload = ({id, file, model}) => {
        const { uniqueId, uploadUrl } = model;

        return function(dispatch) {
            dispatch(receiveUploadModel(id, model))
            uploadFile({file, uploadUrl, 
                onLoadStart: (e) => dispatch(handleStatus(uniqueId, e)),
                onProgress: (e) => dispatch(handleProgress(uniqueId, e)), 
                onLoadEnd: (e) => dispatch(handleStatus(uniqueId, e)),
            })
        }
 
    }

    return function(dispatch) {
        getUploadModel({id, file, uploadData, callback: (props) => dispatch(handleUpload(props))})
    }

}

export const getUploadModel = ({file, uploadData, callback, ...props}) => {

    const { type } = file;

    let url = API + '/admin/api/media/upload';
  
    if (type.startsWith('image/')) {
        url = url + '/image'
    } else if (type.startsWith('video/')) {
        url = url + '/video'
    } else if (type.startsWith('audio/')) {
        url = url + '/audio'
    } else {
        url = url + '/misc'
    }

    const payload = JSON.stringify(uploadData);

    const artworkFiles = uploadData && uploadData.artworkFiles;

    if (artworkFiles && artworkFiles.length) {


        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(model => {
//            callback({file, model, ...props})
            uploadArtwork({parentFile: file, parentData: model, parentCallback: callback, artworkFiles, ...props})
        })    



//        uploadArtwork({parentFile: file, parentData: uploadData, parentCallback: callback, artworkFiles, ...props})

    } else {

        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(model => callback({file, model, ...props}))    
    
    }
 
}


export const uploadFile = ({file, uploadUrl, onLoadStart, onProgress, onAbort, onError, onLoad, onTimeout, onLoadEnd}) => {

    let payload = new FormData();
    payload.append('file', file);

    var xhr = new XMLHttpRequest();
    onLoadStart && xhr.upload.addEventListener("load", (event) => onLoadStart(event), false);
    onProgress && xhr.upload.addEventListener("progress", (event) => onProgress(event), false);
    onAbort && xhr.upload.addEventListener("abort", (event) => onAbort(event), false);
    onError && xhr.upload.addEventListener("error", (event) => onError(event), false);
    onLoad && xhr.upload.addEventListener("load", (event) => onLoad(event), false);
    onTimeout && xhr.upload.addEventListener("timeout", (event) => onTimeout(event), false);
    onLoadEnd && xhr.upload.addEventListener("loadend", (event) => onLoadEnd(event), false);
    xhr.open("POST", uploadUrl);
    xhr.send(payload);

}

export const getUploadStatus = (uniqueId, event) => {

    let uploadProgress;

    if (event && event.lengthComputable) {
        uploadProgress = Math.round(event.loaded * 100 / event.total);
    } else {
        uploadProgress = 100
    }

    let url = API + '/admin/api/media/upload/status/' + uniqueId

    return function(dispatch) {

        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(data => {
            dispatch(receiveUploadStatus(uniqueId, data))
        })

    }
      
}