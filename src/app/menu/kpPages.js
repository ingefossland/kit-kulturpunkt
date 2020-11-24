export default {
    role: "group",
    hidden: true,
    title: "Sidetyper",
    pathname: "pages",
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