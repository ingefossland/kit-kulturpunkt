export default {
    role: "section",
    title: "favoritter",
    pathname: "favourites",

    children: [
        {
            title: "Papirkurv",
            pathname: "/latest",
            icon: "access_time",
            query: {
                models: "documents",
                status: "NOT trash",
                models: "documents",
                sort: "updatedAt DESC"
            }
        },
        {
            title: "Slettet",
            icon: "delete",
            pathname: "/trash",
            query: {
                models: "documents",
                status: "trash",
                models: "documents",
                sort: "deletedAt DESC",
            }
        }
    ]

}