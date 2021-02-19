import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

import EXIF from 'exif-js';
import * as mm from 'music-metadata-browser';

const uploadByUrlSlice = createSlice({
    name: 'upload',
    initialState: {
    }, 
    reducers: {
        requestUpload(state, action) {
            const { id, requested } = action.payload

            return {
                ...state,
                [id]: {
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
            const { id, results } = action.payload

            return state
        },
        requestUploadModel(state, action) {
            const { id, model } = action.payload

            return {
                ...state,
                [id]: {
                    ...state[id],
//                    received: state[id].received + 1,
                }
            }
            
        },
        receiveUploadModel(state, action) {
            const { id, data } = action.payload

            return {
                ...state,
                [id]: {
                    ...state[id],
                    count: state[id].count + 1,
                    resultsLoaded: [
                        ...state[id].resultsLoaded,
                        data
                    ]
                }
            }
        },
        receiveUploadProgress(state, action) {
            const { id, progress } = action.payload

            return state
            
        },
        receiveUploadStatus(state, action) {
            const { id, status } = action.payload

            return state
        }
    }
})

export const getUpload = ({id, acceptedFiles = [], uploadData = { status: "upload" }}) => dispatch => {

    const requested = acceptedFiles.length || 0

    dispatch(requestUpload({id, requested}))

    acceptedFiles && acceptedFiles.map((file, index) => {
//      dispatch(requestUploadModel({id}))
        dispatch(getUploadUrl({id, file, uploadData}))
    })

}

export const getUploadUrl = ({id, file, uploadData = {}}) => dispatch => {

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

    console.log('url', url);

    const payload = JSON.stringify(uploadData);

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
    .then(data => dispatch(getUploadData({id, file, data})))        

}



export const getUploadData = ({id, file, data}) => dispatch => {

    // uniqueId + uploadUrl

    const { uniqueId, uploadUrl } = data;

    dispatch(receiveUploadModel({id, data}))

    const handleStatus = (uniqueId, event) => {
        let uploadProgress;

        if (event && event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }
    
        let url = API + '/admin/api/media/upload/status/' + uniqueId
    
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

    const _onProgress = (event) => {
        let uploadProgress;

        if (event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }

        console.log("PROGRESS", uploadProgress)
    
//        dispatch(receiveUploadProgress(uniqueId, uploadProgress))
    
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