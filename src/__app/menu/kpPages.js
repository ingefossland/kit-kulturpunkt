export default {
    role: "section",
//    hidden: true,
    title: "Sider",
    pathname: "pages",
//    viewOptions: ["list","grid"],
//    view: "grid",
    query: {
        models: "documents",
        documentType: "page*",
        status: "NOT trash"
    },
    children: [
        {
            title: "Hjemmeside",
            icon: "pageHome",
            pathname: "home",
            query: {
                models: "documents",
                documentType: "pageHome",
                status: "NOT trash"
            }
        },
        {
            title: "Tema",
            icon: "pageParent",
            pathname: "topic",
            query: {
                models: "documents",
                documentType: "pageTopic",
                status: "NOT trash"
            }
        },
        {
            title: "Kart",
            icon: "pageMap",
            pathname: "map",
            query: {
                models: "documents",
                documentType: "pageMap",
                status: "NOT trash"
            }
        }
    ]
}