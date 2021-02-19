import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';
import EXIF from 'exif-js';
import * as mm from 'music-metadata-browser';

import { receiveModel, receiveModelProps } from "../modelsById/"

const uploadByUrlSlice = createSlice({
    name: 'upload',
    initialState: {
    }, 
    reducers: {
        requestUpload(state, action) {
            const { url, requested } = action.payload

            return {
                ...state,
                [url]: {
//                    acceptedFiles: acceptedFiles,
//                    rejectedFiles: rejectedFiles,
                    requested: requested,
                    received: 0,
                    count: 0,
                    resultsLoaded: []
                }
            }
        },
        receiveUpload(state, action) {
            const { url, results } = action.payload

            return state
        },
        requestUploadModel(state, action) {
            const { url, model } = action.payload

            return {
                ...state,
                [url]: {
                    ...state[url],
//                    received: state[id].received + 1,
                }
            }
            
        },
        receiveUploadModel(state, action) {
            const { url, model } = action.payload

            return {
                ...state,
                [url]: {
                    ...state[url],
                    count: state[url].count + 1,
                    resultsLoaded: [
                        ...state[url].resultsLoaded,
                        model
                    ]
                }
            }
        },
        receiveUploadProgress(state, action) {
            const { url, progress } = action.payload

            return state
            
        },
        receiveUploadStatus(state, action) {
            const { url, status } = action.payload

            return state
        }
    }
})

export const getUpload = ({url, acceptedFiles = [], uploadData = { status: "upload" }}) => dispatch => {

    const requested = acceptedFiles.length || 0

    dispatch(requestUpload({url, requested}))

    acceptedFiles && acceptedFiles.map((file, index) => {
//      dispatch(requestUploadModel({id}))
        dispatch(getUploadUrl({url, file, uploadData}))
    })

}

export const getUploadUrl = ({url, file, uploadData = {}}) => dispatch => {

    console.log('getUploadMetadata', file)

    const { name, type, size } = file

    uploadData = {
        ...uploadData,
        title: uploadData.title || name,
        filename: name,
        mimeType: type,
        mediaSize: size,
        content: {
            ...uploadData.content,
            title: name,
            filename: name
        }
    }

    // where to upload?

    let apiUrl = API + '/admin/api/media/upload';
  
    if (type.startsWith('image/')) {
        apiUrl = apiUrl + '/image'
    } else if (type.startsWith('video/')) {
        apiUrl = apiUrl + '/video'
    } else if (type.startsWith('audio/')) {
        apiUrl = apiUrl + '/audio'
    } else {
        apiUrl = apiUrl + '/misc'
    }

    console.log('apiUrl', apiUrl);

    const payload = JSON.stringify(uploadData);

    fetch(apiUrl, {
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
    .then(model => dispatch(getUploadData({url, file, model})))        

}



export const getUploadData = ({url, file, model}) => dispatch => {

    // uniqueId + uploadUrl

    const { uniqueId, uploadUrl } = model;

    dispatch(receiveUploadModel({url, model}))
    dispatch(receiveModel(model))

    const _onStatus = (event) => {
        let uploadProgress;

        if (event && event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }
    
        const apiUrl = API + '/admin/api/media/upload/status/' + uniqueId
    
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(model => {
            dispatch(receiveUploadStatus({uniqueId, model}))
        })

    }

    const _onProgress = (event) => {
        let uploadProgress;

        if (event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }

        dispatch(receiveModelProps({uniqueId, uploadProgress}))

//        dispatch(receiveUploadProgress({uniqueId, uploadProgress}))
    
    }


    // do the upload

    let payload = new FormData();
    payload.append('file', file);

    var xhr = new XMLHttpRequest();
//    onLoadStart && xhr.upload.addEventListener("load", (event) => _onLoadStatus(event), false);
        xhr.upload.addEventListener("progress", (event) => _onProgress(event), false);
//    onAbort && xhr.upload.addEventListener("abort", (event) => _onAbort(event), false);
//    onError && xhr.upload.addEventListener("error", (event) => _onError(event), false);
//    onLoad && xhr.upload.addEventListener("load", (event) => _onLoad(event), false);
//    onTimeout && xhr.upload.addEventListener("timeout", (event) => _onTimeout(event), false);
//    onLoadEnd && xhr.upload.addEventListener("loadend", (event) => _onLoadEnd(event), false);
    xhr.open("POST", uploadUrl);
    xhr.send(payload);


//    getUploadModel({id, file, uploadData, callback: (props) => dispatch(handleUpload(props))})

}



export const { requestUpload, requestUploadModel, receiveUploadModel, receiveUploadStatus, receiveUploadProgress } = uploadByUrlSlice.actions
export default uploadByUrlSlice.reducer