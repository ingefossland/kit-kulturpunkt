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
        children: [
            kioskLink,
            adminLink,
        ]
    }
]