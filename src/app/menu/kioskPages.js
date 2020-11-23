export default {
    role: "group",
    hidden: true,
    title: "Kiosk",
    pathname: "kiosk",
    children: [
        {
            role: "group",
            title: "Mosaikk",
            icon: "view_stream",
            pathname: "grid",
            query: {
                models: "documents",
                documentType: "pageGrid",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Tidslinje",
            icon: "view_stream",
            pathname: "timeline",
            query: {
                models: "documents",
                documentType: "pageTimeline",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Bildekart",
            icon: "view_stream",
            pathname: "annotate",
            query: {
                models: "documents",
                documentType: "pageAnnotate",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Media",
            icon: "view_stream",
            pathname: "media",
            query: {
                models: "documents",
                documentType: "pageMedia",
                status: "NOT trash"
            }
        },
        {
            role: "group",
            title: "Liste",
            icon: "view_stream",
            pathname: "list",
            query: {
                models: "documents",
                documentType: "pageList",
                status: "NOT trash"
            }
        }
    ]
}