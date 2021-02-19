export default {
    role: "section",
//    hidden: true,
    title: "Presentasjoner",
    pathname: "pages",
    view: "grid",
    query: {
        models: "documents",
        documentType: "page*",
//        status: "NOT trash"
    },
    children: [
        {
            title: "Mosaikk",
            icon: "pageGrid",
            pathname: "grid",
            query: {
                models: "documents",
                documentType: "pageGrid",
                status: "NOT trash"
            }
        },
        {
            title: "Tidslinje",
            icon: "pageTimeline",
            pathname: "timeline",
            query: {
                models: "documents",
                documentType: "pageTimeline",
                status: "NOT trash"
            }
        },
        {
            title: "Bildekart",
            icon: "pageAnnotate",
            pathname: "annotate",
            query: {
                models: "documents",
                documentType: "pageAnnotate",
                status: "NOT trash"
            }
        },
        {
            title: "Media",
            icon: "pageMedia",
            pathname: "media",
            query: {
                models: "documents",
                documentType: "pageMedia",
                status: "NOT trash"
            }
        },
        {
            title: "Liste",
            icon: "pageList",
            pathname: "list",
            query: {
                models: "documents",
                documentType: "pageList",
                status: "NOT trash"
            }
        }
    ]
}