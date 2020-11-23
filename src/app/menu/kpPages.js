export default {
    role: "group",
    hidden: true,
    title: "Sidetyper",
    pathname: "pages",
    children: [
        {
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