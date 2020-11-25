export default {
    icon: "kioskMenu",
    url: "/kiosk",
    title: "Kiosk",
    view: "grid",
    viewOptions: [],
    query: {
        models: "documents",
        documentType: "device*",
        status: "NOT trash"
    }
}