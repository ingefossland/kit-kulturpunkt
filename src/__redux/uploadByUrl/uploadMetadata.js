

export const getImageMetadata = ({file, uploadData = {}, callback, dispatch, ...props}) => {

    console.log('getImageMetadata', file)

    EXIF.getData(file, function() {
        const { iptcdata, exifdata } = this;

        console.log('iptcdata', iptcdata)
        console.log('exifdata', exifdata)

        uploadData = {
            ...uploadData,
            content: {
                ...uploadData.content,
//                exifdata: exifdata,
                iptcdata: iptcdata
            }
        }

        callback({file, uploadData, ...props})


    });

}

export const getVideoMetadata = ({file, uploadData = {}, callback, ...props}) => {

    console.log('getVideoMetadata', file)

    const url = URL.createObjectURL(file)

    mm.fetchFromUrl(url, {mimeType: file.type, size: file.size })
    .then(metadata => {
        const { format, common } = metadata

        console.log('videometa', metadata)

        const { picture, title, artist, albumartist, album, composer, date, year } = common
        const { duration } = format

        uploadData = {
            ...uploadData,
            title: title || uploadData.title,
            duration: duration,
            content: {
                ...uploadData.content,
                duration: duration
            }
        }

        callback({file, uploadData, ...props})
        
    })

}


export const getAudioMetadata = ({file, uploadData = {}, callback, ...props}) => {

    console.log('getAudioMetadata', file)

    const url = URL.createObjectURL(file)

    mm.fetchFromUrl(url, {mimeType: file.type, size: file.size })
    .then(metadata => {
        const { common, format } = metadata

        console.log('audiodata', metadata)

        const { picture, title, artist, albumartist, album, composer, date, year } = common
        const { duration } = format

        uploadData = {
            ...uploadData,
            title: title || uploadData.title,
            duration: duration,
            content: {
                ...uploadData.content,
                duration: duration
            }
        }

        let artwork = [], artworkFiles = []

        if (picture && picture[0] && picture[0].data) {
            const { data, format, description } = picture[0]

            const blob = new Blob([data], { type: format });
            const file = new File([data], "artwork.jpg", { type: format });

            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);

            artworkFiles.push(file)

            artwork.push({
                mediaId: undefined,
                media: {
                    mediaType: "image",
                    imageUrl: imageUrl,
                    blob: blob
                }
            })


        }

        uploadData = {
            ...uploadData,
            content: {
                ...uploadData,
                artwork: artwork
            },
            artworkFiles
        }

        callback({file, uploadData, ...props})
        
    })

}




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
