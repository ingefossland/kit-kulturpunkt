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