export default {
    role: "group",
    icon: "photo",
    title: "Media",
    pathname: "media",
    query: {
        models: "media",
        mediaType: "*",
        collectionId: "*",
        status: "NOT trash"
    },
    children: [
        {
            title: "Images",
            pathname: "images",
            query: {
                models: "media",
                mediaType: "image"
            },
        },
        {
            title: "Video",
            pathname: "video",
            query: {
                models: "media",
                mediaType: "video"
            },
        },
        {
            title: "Audio",
            pathname: "audio",
            query: {
                models: "media",
                mediaType: "audio"
            },
        },
        {
            title: "Misc",
            pathname: "misc",
            query: {
                models: "media",
                mediaType: "misc"
            },
        },
        {
            title: "Apps",
            pathname: "apps",
            query: {
                models: "media",
                mediaType: "misc"
            },
        },
        {
            title: "Upload",
            pathname: "upload"
        }
    ]
}