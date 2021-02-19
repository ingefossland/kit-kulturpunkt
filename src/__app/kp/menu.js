import {
    kpHome,
    kpPages,
    kpLink,

    kioskHome,
    kioskPages,
    kioskDevices,
    kioskLink,

    ekultur,
    articles,
    media,
    latest,
    trash,
    search,

    adminLink,
    collectionsLink
} from "../menu/"

export default [
    kpHome,
    articles,
    kpPages,
    media,
    latest,
    trash,
    search,
    {
        role: "section",
        title: "Favoritter",
        pathname: "favourites",
        children: [
            kioskLink,
            collectionsLink,
            adminLink,
        ]
    }
]