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
    kioskHome,
    articles,
    media,
    kioskPages,
    kioskDevices,
    latest,
    trash,
    kpLink,
    {
        role: "section",
        title: "Favoritter",
        children: [
            settings,
        ]
    }
]