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
                documentType: "pageGrid",
            }
        },
        {
            title: "Tidslinje",
            icon: "pageTimeline",
            pathname: "timeline",
            query: {
                documentType: "pageTimeline",
            }
        },
        {
            title: "Bildekart",
            icon: "pageAnnotate",
            pathname: "annotate",
            query: {
                documentType: "pageAnnotate",
            }
        },
        {
            title: "Media",
            icon: "pageMedia",
            pathname: "media",
            query: {
                documentType: "pageMedia",
            }
        },
        {
            title: "Liste",
            icon: "pageList",
            pathname: "list",
            query: {
                documentType: "pageList",
            }
        }
    ]
}