import theme from "./theme"
import primaryAction from "./action"
import menu from "./menu"

export default {
    theme: theme,
    icon: "primusApp",
    url: "/",
    root: "",
    siteId: 2,
    collectionId: 201,
    title: "Primus art",
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
        "placeholder": "Søk i Primus art"
    }
}