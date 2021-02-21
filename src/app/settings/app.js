import theme from "./theme"
import primaryAction from "./action"
import menu from "./menu"

export default {
    theme: theme,
    icon: "kpApp",
    url: "/",
    root: "",
    siteId: 1,
    collectionId: 54,
    title: "KulturPunkt",
    subtitle: "Museum",
    menu: menu,
    primaryAction: primaryAction,
    sidebar: {
        expanded: false
    },
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
//        "variant": "growing",
        "expanded": false,
        "placeholder": "Søk i KulturPunkt"
    }
}