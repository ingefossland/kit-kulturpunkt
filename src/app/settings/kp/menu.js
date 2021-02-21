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
        viewOptions: ["list","icons"],
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
        viewOptions: ["list","icons"],
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
        viewOptions: ["list","icons"],
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
        viewOptions: ["list","icons"],
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