import {
    latest,
    trash,
} from "../menu/"

const sites = {
    icon: "business",
    title: "Sites",
    pathname: "sites",
    query: {
        models: "sites",
        status: "NOT trash"
    }
}

const users = {
    icon: "people",
    title: "Users",
    pathname: "users",
    query: {
        models: "users",
        status: "NOT trash"
    }
}

const collections = {
    icon: "folder",
    title: "Collections",
    pathname: "collections",
    query: {
        models: "collections",
        collectionType: "kp",
        status: "NOT trash"
    }
}

const home = {
    title: "Admin",
    url: "/admin",
    role: "section",
    viewOptions: ["icons"],
    query: {
        models: "collections",
        collectionType: "kp",
        status: "NOT trash"
    },
    children: [
        collections,
        sites,
        users,
    ]
}

const loaders = {
    role: "section",
    title: "Favoritter",
    pathname: "favourites",
    children: [
        {
            icon: "folder",
            title: "Swich collection",
            url: "/",
        }
    ]

}


export default [
    home,
//    collections,
//    sites,
//    users,
    loaders
]