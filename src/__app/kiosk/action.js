
const kpArticle = {
    icon: "article",
    title: "Ny artikkel",
    pathname: "/article/new?documentType=article"
}

const kioskPages = {
    role: "group",
    children: [
        {
            icon: "pageGrid",
            title: "Ny mosaikkk",
            pathname: "/kiosk/new?documentType=pageGrid"
        },
        {
            icon: "pageTimeline",
            title: "Ny tidslinje",
            pathname: "/kiosk/new?documentType=pageTimeline"
        },
        {
            icon: "pageAnnotate",
            title: "Nytt bildekart",
            pathname: "/kiosk/new?documentType=pageAnnotate"
        },
        {
            icon: "pageMedia",
            title: "Ny media",
            pathname: "/kiosk/new?documentType=pageMedia"
        },
        {
            icon: "pageList",
            title: "Ny liste",
            pathname: "/kiosk/new?documentType=pageList"
        },
    ]
}

const kioskDevice = {
    role: "group",
    children: [
        {
            icon: "bug_report",
            title: "Ny enhet",
            pathname: "/device/new?documentType=device"
        },
    ]
}

export default {
    title: "Nytt innhold",
    pathname: "/create",
    "children": [
        kpArticle,
        kioskPages,
        kioskDevice
    ]

}