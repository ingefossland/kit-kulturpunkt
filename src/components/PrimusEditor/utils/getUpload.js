const API = "https://kompass.dimu.org"

const _getUploadUrl = ({file, uploadData, onAdd, onProgress}) => {
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
    .then(model => _getUploadData({file, model, onAdd, onProgress}))          

}

const _getUploadData = ({file, model, onAdd, onProgress}) => {
    const { uniqueId, uploadUrl } = model;

    onAdd && onAdd(model)

    const _onProgress = (event) => {
        let uploadProgress;

        if (event.lengthComputable) {
            uploadProgress = Math.round(event.loaded * 100 / event.total);
        } else {
            uploadProgress = 100
        }

        onProgress && onProgress({
            uniqueId,
            uploadProgress
        })

    }

    // do the upload

    let payload = new FormData();
    payload.append('file', file);

    var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (event) => _onProgress(event), false);
        xhr.open("POST", uploadUrl);
        xhr.send(payload);

}

const getArrayUpload = ({acceptedFiles = [], uploadData = {}, onAdd}) => {

    acceptedFiles && acceptedFiles.map((file, index) => {
        _getUploadUrl({file, uploadData, onAdd})
    })

}

const getUpload = ({file, uploadData = {}, onAdd, onProgress}) => {
    _getUploadUrl({file, uploadData, onAdd, onProgress})
}


export {
    getUpload,
    getArrayUpload
}