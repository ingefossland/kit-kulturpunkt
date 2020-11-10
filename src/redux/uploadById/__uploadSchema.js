import { API } from '../settings';
import { getUploadMetadata, getUploadModel, uploadFile } from "./upload"

export const getSchemaUpload = ({schema, ...props}) => {
    if (schema.type === "array") {
        getSchemaArrayUpload({schema, ...props})
    } else if (schema.type === "object") {
        getSchemaObjectUpload({schema, ...props})
    }
}


export const getSchemaArrayUpload = ({acceptedFiles = [], ...props}) => {
    const { formData, canAdd, onAddItem, onChangeIndex } = props;

    if (!canAdd) {
        return false
    }

    let uploads = formData

    const handleAdd = (model, index) => {
        onAddItem && onAddItem({mediaId: model.uniqueId, media: model})

        uploads.push({
            mediaId: model.uniqueId,
            media: model
        })

    }

    const handleProgress = (model, event) => {

        console.log('uploads', uploads)

        const index = uploads.findIndex(upload => upload.mediaId === model.uniqueId)

        console.log('index', index)

        let uploadProgress;

        if (event && event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }

        console.log('uploadProgress', uploadProgress)

        model = {
            ...model,
            uploadProgress: uploadProgress
        }

        if (index && onChangeIndex) {
            console.log('changeIndex', index)
            onChangeIndex(index, {
                mediaId: model.uniqueId,
                media: model
            });
        }


    }

    acceptedFiles && acceptedFiles.map((file, index) => {
        getUploadMetadata({file, onUploadAdd: (model) => handleAdd(model), onProgress: (model, e) => handleProgress(model, e), callback: (props) => getSchemaUploadData(props), ...props})
    })

}

export const getSchemaObjectUpload = ({acceptedFiles = [], ...props}) => {
    const { onChange } = props;

    const handleAdd = (model) => {
        onChange && onChange({mediaId: model.uniqueId, media: model})
    }

    const handleChange = (model, event) => {

        let uploadProgress;

        if (event && event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }

        model = {
            ...model,
            uploadProgress: uploadProgress
        }

        onChange && onChange({mediaId: model.uniqueId, media: model})
    }

    acceptedFiles && acceptedFiles.map(file => {
        getUploadMetadata({file, onUploadAdd: handleAdd, onProgress: handleChange, callback: (props) => getSchemaUploadData(props), ...props})
    })

}

export const getSchemaUploadData = ({file, uploadData, ...props}) => {

    const handleUpload = ({file, model, onUploadAdd, onProgress, ...props}) => {
        const { uploadUrl } = model;

        onUploadAdd(model)

        uploadFile({file, uploadUrl, 
            onLoadStart: (e) => onProgress(model, e),
            onProgress: (e) => onProgress(model, e), 
            onLoadEnd: (e) => onProgress(model, e),
        })
 
    }

    getUploadModel({file, uploadData, callback: (props) => handleUpload(props), ...props})
}

/*

export const getSchemaUploadUrl = ({file, uploadData, handleUpload, handleChange, ...props}) => {
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
    .then(data => schemaUploadFile({file, data, handleUpload, handleChange}))    

}

export const schemaUploadFile = ({file, data, handleUpload, handleChange}) => {

    handleUpload(data)

    const { uploadUrl } = data

    let payload = new FormData();
    payload.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (event) => handleChange(data, event), false);
    xhr.upload.addEventListener("loadstart", (event) => handleChange(data, event), false);
    xhr.upload.addEventListener("load", (event) => handleChange(data, event), false);
    xhr.upload.addEventListener("loadend", (event) => handleChange(data, event), false);
    xhr.upload.addEventListener("error", (event) => handleChange(data, event), false);
    xhr.open("POST", uploadUrl);
    xhr.send(payload);

}

*/