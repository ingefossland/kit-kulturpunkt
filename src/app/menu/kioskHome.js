export default {
    icon: "kioskMenu",
    url: "/kiosk",
    title: "Kiosk",
    view: "icons",
    viewOptions: ["list","icons"],
    query: {
        models: "documents",
        documentType: "device*",
        status: "NOT trash"
    }
}