export default {
    role: "group",
    icon: "settings",
    title: "Settings",
    pathname: "settings",
    hidden: true,
    children: [
        {
            icon: "settings",
            title: "Collections",
            pathname: "collections",
            template: "collections",
            query: {
                models: "collections",
                collectionType: "kp",
                status: "NOT trash"
            }
        }
    ]

}