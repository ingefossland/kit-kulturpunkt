import KpMenuIcon from "../../icons/KpMenuIcon"

export default {
    type: "tree",
    role: "group",
    title: "KulturPunkt",
    icon: KpMenuIcon(),
    url: "/kp",
    template: "finder/tree",
    query: {
        models: "documents",
        status: "NOT trash",
        documentType: "page*",
        q: "NOT parentId:*"
    },
}