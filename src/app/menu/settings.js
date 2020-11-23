export default {
    role: "group",
    icon: "settings",
    title: "Settings",
    pathname: "settings",
    children: [
        {
            role: "group",
            title: "Collections",
            pathname: "collections",
            layout: "masonry",
            query: {
                models: "collections",
                collectionType: "kp",
                status: "NOT trash"
            }
        }
    ]

}