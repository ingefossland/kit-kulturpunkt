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
        }
    },

]

const mediaTypes = [
    {
        pathname: "image",
        title: "Bilder",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "media",
            mediaType: "image",
        }
    },
    {
        pathname: "video",
        title: "Video",
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
        icon: "access_time",
        query: {
            models: "documents",
            status: "NOT trash",
            models: "documents",
            sort: "updatedAt DESC"
        }
        },
    {
        icon: "delete",
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
    {
        url: "/kiosk",
        title: "Alt innhold",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "*",
        }
    },
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