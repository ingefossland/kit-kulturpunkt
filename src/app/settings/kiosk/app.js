import theme from "./theme"
import primaryAction from "./action"
import menu from "./menu"

export default {
    theme: theme,
    icon: "kioskApp",
    url: "/kiosk",
    root: "/kiosk",
    siteId: 1,
    collectionId: 54,
    title: "Kiosk",
    subtitle: "Museum",
    menu: menu,
    primaryAction: primaryAction,
    sidebar: {
        expanded: true
    },
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
//        "variant": "growing",
        "expanded": false,
        "placeholder": "Søk i Kiosk"
    }
}