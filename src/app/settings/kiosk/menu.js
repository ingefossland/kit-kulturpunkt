const home = {
    url: "/kiosk",
    title: "Alt innhold",
    view: "icons",
    viewOptions: ["list","table","icons","gallery","masonry"],
    query: {
        models: "documents",
        documentType: "*",
        status: "NOT trash"
    }
}

const contentTypes = [
    {
        pathname: "article",
        title: "Artikler",
        icon: "article",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "article",
            status: "NOT trash"
        }
    },
    {
        pathname: "device",
        title: "Enheter",
        icon: "device",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "device",
            status: "NOT trash"
        }
    },
    {
        pathname: "grid",
        title: "Mosaikk",
        icon: "pageGrid",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "pageGrid",
            status: "NOT trash"
        }
    },
    {
        pathname: "timeline",
        title: "Tidslinje",
        icon: "pageTimeline",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "pageTimeline",
            status: "NOT trash"
        }
    },
    {
        pathname: "annotate",
        title: "Bildekart",
        icon: "pageAnnotate",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "pageAnnotate",
            status: "NOT trash"
        }
    },
    {
        pathname: "media",
        title: "Media",
        icon: "pageMedia",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "pageMedia",
            status: "NOT trash"
        }
    },
    {
        pathname: "list",
        icon: "pageList",
        title: "Liste",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "pageList",
            status: "NOT trash"
        }
    },

]


const mediaTypes = [
    {
        pathname: "image",
        title: "Bilder",
        view: "icons",
        icon: "imageFolder",
        viewOptions: ["list","icons"],
        query: {
            models: "media",
            mediaType: "image",
        }
    },
    {
        pathname: "video",
        title: "Video",
        icon: "videoFolder",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "media",
            mediaType: "video",
        }
    },
    {
        pathname: "audio",
        title: "Audio",
        icon: "audioFolder",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "media",
            mediaType: "audio",
        }
    },

]

const shortcuts = [
    {
        pathname: "latest",
        title: "Latest",
        icon: "history",
        query: {
            models: "documents",
            status: "NOT trash",
            models: "documents",
            sort: "updatedAt DESC"
        }
        },
    {
        icon: "delete_outline",
        title: "Trash",
        pathname: "trash",
        query: {
            models: "documents",
            status: "trash",
            models: "documents",
            sort: "deletedAt DESC",
        }
    }

]

const favourites = [
    {
        url: "/kp",
        title: "KulturPunkt",
        icon: "kpMenu",
    }
]

export default [
    home,
    {
        title: "Innhold",
        pathname: "content",
        role: "section",
        children: contentTypes
    },
    {
        title: "Media",
        pathname: "media",
        role: "section",
        children: mediaTypes
    },
    {
        title: "Snarveier",
        pathname: "shortcuts",
        role: "section",
        children: shortcuts
    },
    {
        title: "Favoritter",
        pathname: "favourites",
        role: "section",
        children: favourites
    }

]