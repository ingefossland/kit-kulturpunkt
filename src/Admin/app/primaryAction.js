
const kpPages = {
    role: "group",
    children: [
        {
            icon: "event",
            title: "Nytt kart",
            url: "/admin/kpMap/new"
        },
        {
            icon: "event",
            title: "Nytt tema",
            url: "/admin/kpTopic/new"
        },
    ]
}

const kioskPages = {
    role: "group",
    children: [
        {
            icon: "event",
            title: "Ny mosaikkk",
            url: "/admin/kioskGrid/new"
        },
        {
            icon: "event",
            title: "Ny tidslinje",
            url: "/admin/kioskTimeline/new"
        },
        {
            icon: "event",
            title: "Nytt bildekart",
            url: "/admin/kioskAnnotate/new"
        },
        {
            icon: "event",
            title: "Ny tidslinje",
            url: "/admin/kioskMedia/new"
        },
        {
            icon: "event",
            title: "Ny liste",
            url: "/admin/kioskList/new"
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
        kioskPages
    ]

}