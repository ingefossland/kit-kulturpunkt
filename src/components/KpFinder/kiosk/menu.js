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
    
    collectionsLink,
    adminLink,
    places,
} from "../menu"

export default [
    kioskHome,

    {
        role: "section",
        title: "Innhold",
        children: [
            articles,
            kioskDevices,
        ]
    },

    kioskPages,
    media,
    places,
    {
        role: "section",
        title: "Favoritter",
        pathname: "favourites",
        children: [
            kpLink,
            collectionsLink,
            adminLink,
        ]
    }
]