const kpPages = {
    role: "group",
    hidden: true,
    pathname: "pages",
    children: [
        {
            role: "group",
            title: "Tema",
            icon: "view_stream",
            pathname: "topic",
            query: {
                models: "documents",
                documentType: "kpTopic",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Kart",
            icon: "view_stream",
            pathname: "map",
            query: {
                models: "documents",
                documentType: "kpMap",
                status: "NOT trash"
            }
        }
    ]
}

const media = {
    role: "group",
    type: "media",
    title: "Media",
    children: [
        {
            type: "media/image",
            title: "Images"
        },
        {
            type: "media/video",
            title: "Video"
        },
        {
            type: "media/audio",
            title: "Audio"
        },
        {
            type: "media/misc",
            title: "Misc"
        },
        {
            type: "media/application",
            title: "Apps"
        },
        {
            type: "media/upload",
            title: "Upload"
        }
    ]
}

const kpArticles = {
    role: "group",
    title: "Artikler",
    icon: "view_stream",
    pathname: "article",
    query: {
        models: "documents",
        documentType: "article",
        status: "NOT trash"
    }
}

const kioskPages = {
    role: "group",
    hidden: true,
    title: "Kiosk",
    pathname: "kiosk",
    children: [
        {
            role: "group",
            title: "Mosaikk",
            icon: "view_stream",
            pathname: "grid",
            query: {
                models: "documents",
                documentType: "kioskGrid",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Tidslinje",
            icon: "view_stream",
            pathname: "timeline",
            query: {
                models: "documents",
                documentType: "kioskTimeline",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Bildekart",
            icon: "view_stream",
            pathname: "annotate",
            query: {
                models: "documents",
                documentType: "kioskAnnotate",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Media",
            icon: "view_stream",
            pathname: "media",
            query: {
                models: "documents",
                documentType: "kioskMedia",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Liste",
            icon: "view_stream",
            pathname: "list",
            query: {
                models: "documents",
                documentType: "kioskList",
                status: "NOT trash"
            }
        }
    ]
}

export default [
    {
        type: "documents/tree",
        role: "group",
        title: "KulturPunkt",
        icon: "home",
        pathname: "",
        query: {
            models: "documents",
            status: "NOT trash",
            documentType: "page*",
            q: "NOT parentId:*"
        },
    },
    kpArticles,
    kpPages,
    kioskPages,
    media,
    {
        role: "group",
        title: "Ekultur",
        icon: "link",
        pathname: "ekultur",
        query: {
            models: "documents",
            documentType: "ekultur*",
            status: "NOT trash"
        }
    },
    {
        role: "group",
        type: "latest",
        title: "Latest",
        pathname: "latest"
    },
    {
        role: "group",
        type: "trash",
        title: "Trash",
        pathname: "trash"
    }

]