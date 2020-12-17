export default {
    icon: "kioskMenu",
    url: "/:siteName/kiosk",
    title: "Kiosk",
    view: "icons",
    viewOptions: ["list","icons"],
    query: {
        models: "documents",
        documentType: "device*",
        status: "NOT trash"
    }
}