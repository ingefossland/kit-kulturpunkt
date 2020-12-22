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
} from "../menu/"

export default [
    kioskHome,
    articles,
    kioskPages,
    kioskDevices,
    media,
    search,
    latest,
    trash,
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