
const kpPages = {
    role: "group",
    children: [
        {
            icon: "home",
            title: "Ny forside",
            url: "/admin/pageHome/new"
        },
        {
            icon: "event",
            title: "Nytt kart",
            url: "/admin/pageMap/new"
        },
        {
            icon: "event",
            title: "Nytt tema",
            url: "/admin/pageTopic/new"
        },
    ]
}

const kioskPages = {
    role: "group",
    children: [
        {
            icon: "event",
            title: "Ny mosaikkk",
            url: "/admin/pageGrid/new"
        },
        {
            icon: "event",
            title: "Ny tidslinje",
            url: "/admin/pageTimeline/new"
        },
        {
            icon: "event",
            title: "Nytt bildekart",
            url: "/admin/pageAnnotate/new"
        },
        {
            icon: "event",
            title: "Ny media",
            url: "/admin/pageMedia/new"
        },
        {
            icon: "event",
            title: "Ny liste",
            url: "/admin/pageList/new"
        },
    ]
}

const kioskDevice = {
    role: "group",
    children: [
        {
            icon: "bug_report",
            title: "Ny enhet",
            url: "/admin/device/new"
        },
    ]
}

export default {
    title: "Nytt innhold",
    "children": [
        {
            icon: "event",
            title: "Ny artikkel",
            url: "/admin/article/new"
        },
        kpPages,
        kioskPages,
        kioskDevice
    ]

}