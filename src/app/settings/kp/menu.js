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