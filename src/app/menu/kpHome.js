export default {
    type: "tree",
    role: "group",
    title: "KulturPunkt",
    icon: "kpMenu",
    url: "/kp",
    template: "finder/tree",
    query: {
        rows: 100,
        models: "documents",
        status: "NOT trash",
        documentType: "page*",
        q: "NOT parentId:*"
    },
}