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
    search,
    latest,
    trash,
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