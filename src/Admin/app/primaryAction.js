
const kpPages = {
    role: "group",
    children: [
        {
            icon: "home",
            title: "Ny forside",
            url: "/kp/pages/new?documentType=pageHome"
        },
        {
            icon: "event",
            title: "Nytt kart",
            url: "/kp/pages/new?documentType=pageMap"
        },
        {
            icon: "event",
            title: "Nytt tema",
            url: "/kp/pages/new?documentType=pageTopic"
        },
    ]
}

const kioskPages = {
    role: "group",
    children: [
        {
            icon: "event",
            title: "Ny mosaikkk",
            url: "/kp/kiosk/new?documentType=pageGrid"
        },
        {
            icon: "event",
            title: "Ny tidslinje",
            url: "/kp/kiosk/new?documentType=pageTimeline"
        },
        {
            icon: "event",
            title: "Nytt bildekart",
            url: "/kp/kiosk/new?documentType=pageAnnotate"
        },
        {
            icon: "event",
            title: "Ny media",
            url: "/kp/kiosk/new?documentType=pageMedia"
        },
        {
            icon: "event",
            title: "Ny liste",
            url: "/kp/kiosk/new?documentType=pageList"
        },
    ]
}

const kioskDevice = {
    role: "group",
    children: [
        {
            icon: "bug_report",
            title: "Ny enhet",
            url: "/kp/device/new?documentType=device"
        },
    ]
}

export default {
    title: "Nytt innhold",
    "children": [
        {
            icon: "event",
            title: "Ny artikkel",
            url: "/kp/article/new?documentType=article"
        },
        kpPages,
        kioskPages,
        kioskDevice
    ]

}