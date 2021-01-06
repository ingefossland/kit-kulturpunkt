import { formatMediaSize, formatMediaTime } from "../utils"

export default {
    "select": {
        "source": "source",
        "sourceId": "sourceId",
        "imageUrl": "imageUrl",
        "title" : "title",
        "typeLabel": "typeLabel",
        "metadata": "metadata",
        "filename": "filename",
        "duration": "duration"
    },
    prepare({formData, formContext}) {
        let { uploadProgress, uploadStatus, title, description, mediaType, mediaSize, mediaWidth, mediaHeight, mimeType, imageUrl, filename, duration, content } = formData;

        const t = formContext && formContext.t
        const defaultLocale = formContext && formContext.defaultLocale
        const currentLocale = formContext && formContext.currentLocale
        const locale = currentLocale || defaultLocale
        const localeId = locale && "locale:" + locale

        if (content) {
            title = content.title && content.title[localeId] || content.filename || title
            description = content.description && content.description[localeId] || description
            duration = content.duration || duration
            filename = content.filename || filename
        }

        if (content && content.artwork && content.artwork[0] && content.artwork[0].media && content.artwork[0].media.imageUrl) {
            imageUrl = content.artwork[0].media.imageUrl
        }

        let typeLabel

        if (mediaType) {
            typeLabel = mediaType;
        }

        if (mediaType === "misc" && mimeType) {
            typeLabel = mimeType;
        }

        // meta

        let metadata = []

        if (uploadProgress) {
            metadata.push(uploadProgress + "%")
        } else if (uploadStatus && uploadStatus !== "done") {
            metadata.push(t && t("uploadStatus:"+uploadStatus || uploadStatus))
        }

        if (mediaWidth && mediaHeight) {
            metadata.push(mediaWidth + "x" + mediaHeight);
        } else if (mediaSize) {
            metadata.push(formatMediaSize(mediaSize));
        }

        if (duration) {
            metadata.push(formatMediaTime(duration));
        }

        if (content && content.captions && content.captions.length) {
            metadata.push(content.captions.length + " undertekster");
        }


        return {
            source: undefined,
            sourceId: undefined,
            imageUrl: imageUrl,
            title: title,
            typeLabel: typeLabel,
            metadata: metadata,
            filename: filename,
            duration: duration
        }
    }

}