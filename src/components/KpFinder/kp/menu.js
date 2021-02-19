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
    places,

    adminLink,
    collectionsLink
} from "../menu"

export default [
    kpHome,
    {
        role: "section",
        title: "Innhold",
        children: [

            articles,
        ]
    },
    kpPages,
    media,
    places,
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