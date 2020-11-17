export default {
    role: "group",
    hidden: true,
    pathname: "pages",
    children: [
        {
            role: "group",
            title: "Hjemmeside",
            icon: "view_stream",
            pathname: "home",
            query: {
                models: "documents",
                documentType: "pageHome",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Tema",
            icon: "view_stream",
            pathname: "topic",
            query: {
                models: "documents",
                documentType: "pageTopic",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Kart",
            icon: "view_stream",
            pathname: "map",
            query: {
                models: "documents",
                documentType: "pageMap",
                status: "NOT trash"
            }
        }
    ]
}