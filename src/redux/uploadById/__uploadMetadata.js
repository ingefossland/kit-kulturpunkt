import EXIF from 'exif-js';
import * as mm from 'music-metadata-browser';

export const getUploadMetadata = ({file, uploadData = {}, callback, ...props}) => {

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

    if (type && type.startsWith("image")) {
        return getImageMetadata({file, uploadData, callback, ...props})
    
    } else if (type && type.startsWith("video")) {
        return getVideoMetadata({file, uploadData, callback, ...props})

    } else if (type && type.startsWith("audio")) {
        return getAudioMetadata({file, uploadData, callback, ...props})

    } else {
        callback({file, uploadData, ...props})

    }


}

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