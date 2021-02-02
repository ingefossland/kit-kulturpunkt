export default {
    role: "section",
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
            icon: "photo",
            title: "Images",
            pathname: "images",
            query: {
                models: "media",
                mediaType: "image"
            },
        },
        {
            icon: "movie",
            title: "Video",
            pathname: "video",
            query: {
                models: "media",
                mediaType: "video"
            },
        },
        {
            icon: "audiotrack",
            title: "Audio",
            pathname: "audio",
            query: {
                models: "media",
                mediaType: "audio"
            },
        },
        {
            icon: "attachment",
            title: "Misc",
            pathname: "misc",
            query: {
                models: "media",
                mediaType: "misc"
            },
        },
    ]
}