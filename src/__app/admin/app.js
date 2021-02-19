import menu from "./menu"
import theme from "./theme"
import primaryAction from "./action"

export default {
    theme: theme,
    icon: "kpApp",
    root: "/admin",
    siteId: 1,
    collectionId: 54,
    title: "Kp+Kiosk admin",
    subtitle: "Museum",
    menu: menu,
    primaryAction: primaryAction,
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
        "expanded": false,
        "placeholder": "Søk i Kiosk"
    }
}