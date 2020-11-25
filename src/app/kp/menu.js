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
    settings,
} from "../menu/"

export default [
    kpHome,
    articles,
    kpPages,
    media,
    latest,
    trash,
    kioskLink,
    {
        role: "section",
        title: "Favoritter",
        children: [
            settings,
        ]
    }
]