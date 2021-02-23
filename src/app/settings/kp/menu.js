const kpHome = {
    title: "Alt innhold",
    sortOptions: [],
    sizeOptions: [],
    rowsOptions: [],
    viewOptions: ["tree","cols"],
    query: {
        fl: "uniqueId,id,title",
        rows: 100,
        models: "documents",
        status: "NOT trash",
        documentType: "page*",
        q: "NOT parentId:*"
    },
}

const contentTypes = [
    {
        pathname: "article",
        title: "Artikler",
        icon: "article",
        view: "icons",
        viewOptions: ["list","table","icons"],
        query: {
            models: "documents",
            documentType: "article",
            status: "NOT trash"
        }
    },
    {
        pathname: "homepage",
        title: "Forside",
        icon: "pageHome",
        view: "icons",
        viewOptions: ["list","table","icons"],
        query: {
            models: "documents",
            documentType: "pageHome",
            status: "NOT trash"
        }
    },
    {
        pathname: "topic",
        title: "Tema",
        icon: "pageTopic",
        view: "icons",
        viewOptions: ["list","table","icons"],
        query: {
            models: "documents",
            documentType: "pageTopic",
            status: "NOT trash"
        }
    },
    {
        pathname: "map",
        title: "Kart",
        icon: "pageMap",
        view: "icons",
        viewOptions: ["list","table","icons"],
        query: {
            models: "documents",
            documentType: "pageMap",
            status: "NOT trash"
        }
    },

]

const mediaTypes = [
    {
        pathname: "image",
        title: "Bilder",
        view: "gallery",
        icon: "imageFolder",
        viewOptions: ["gallery","masonry","table","list","icons"],
        query: {
            models: "media",
            mediaType: "image",
            status: "NOT trash"
        }
    },
    {
        pathname: "video",
        title: "Video",
        icon: "videoFolder",
        view: "gallery",
        viewOptions: ["gallery","masonry","table","list","icons"],
        query: {
            models: "media",
            mediaType: "video",
            status: "NOT trash"
        }
    },
    {
        pathname: "audio",
        title: "Audio",
        icon: "audioFolder",
        view: "list",
        viewOptions: ["list","table","icons"],
        query: {
            models: "media",
            mediaType: "audio",
            status: "NOT trash"
        }
    },

]

const shortcuts = [
    {
        pathname: "latest",
        title: "Sist oppdatert",
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
        title: "Slettet",
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
        url: "/kiosk",
        title: "Kiosk",
        icon: "kioskMenu",
    }
]

export default [
    kpHome,
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