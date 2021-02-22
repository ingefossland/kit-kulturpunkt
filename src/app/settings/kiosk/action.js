const contentTypes = [
    {
        icon: "article",
        title: "Artikkel",
        pathname: "article",
        search: "documentType=article"
    },
    {
        icon: "device",
        title: "Enhet",
        pathname: "device",
        search: "documentType=device"
    },
]


const pageTypes = [
    {
        icon: "pageGrid",
        title: "Mosaikk",
        pathname: "grid",
        search: "documentType=pageGrid"
    },
    {
        icon: "pageTimeline",
        title: "Tidslinje",
        pathname: "timeline",
        search: "documentType=pageTimeline"
    },
    {
        icon: "pageAnnotate",
        title: "Bildekart",
        pathname: "grid",
        search: "documentType=pageAnnotate"
    },
    {
        icon: "pageMedia",
        title: "Media",
        pathname: "media",
        search: "documentType=pageMedia"
    },
    {
        icon: "pageList",
        title: "Liste",
        pathname: "grid",
        search: "documentType=pageList"
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