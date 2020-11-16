export default {
    type: "tree",
    role: "group",
    title: "KulturPunkt",
    icon: "home",
    pathname: "",
    template: "finder/tree",
    query: {
        models: "documents",
        status: "NOT trash",
        documentType: "pageHome",
        q: "NOT parentId:*"
    },
}