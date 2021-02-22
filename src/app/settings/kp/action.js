const contentTypes = [
    {
        icon: "article",
        title: "Artikkel",
        pathname: "article",
        search: "documentType=article"
    },
]


const pageTypes = [
    {
        icon: "pageHome",
        title: "Forside",
        pathname: "grid",
        search: "documentType=pageHome"
    },
    {
        icon: "pageTopic",
        title: "Tema",
        pathname: "topic",
        search: "documentType=pageTopic"
    },
    {
        icon: "pageMap",
        title: "Kart",
        pathname: "grid",
        search: "documentType=pageMap"
    }

]


export default {
    title: "Create",
    pathname: "create",
    "children": [
        {
            type: "section",
            children: contentTypes
        },
        {
            type: "section",
            children: pageTypes
        }
    ]

}