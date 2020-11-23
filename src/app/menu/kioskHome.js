import KioskMenuIcon from "../../icons/KioskMenuIcon"

export default {
    icon: KioskMenuIcon(),
    url: "/kiosk",
    title: "Kiosk",
    viewOptions: ["masonry"],
    query: {
        models: "documents",
        documentType: "page*",
        status: "NOT trash"
    }
}