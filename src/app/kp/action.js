
const kpArticle = {
    icon: "article",
    title: "Ny artikkel",
    pathname: "/article/new?documentType=article"
}


const kpPages = {
    role: "group",
    children: [
        {
            icon: "pageHome",
            title: "Ny forside",
            pathname: "/pages/new?documentType=pageHome"
        },
        {
            icon: "pageMap",
            title: "Nytt kart",
            pathname: "/pages/new?documentType=pageMap"
        },
        {
            icon: "pageTopic",
            title: "Nytt tema",
            pathname: "/pages/new?documentType=pageTopic"
        },
    ]
}


export default {
    title: "Nytt innhold",
    pathname: "/create",
    "children": [
        kpArticle,
        kpPages
    ]

}