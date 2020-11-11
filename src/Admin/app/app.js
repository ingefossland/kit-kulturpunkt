import getMenuChildren from "../../utils/getMenuChildren"

import menu from "./menu"
import primaryAction from "./primaryAction"
import theme from "./theme"

export default {
    theme: theme,
    root: "/kp",
    siteId: 1,
    collectionId: 54,
    title: "KulturPunkt",
    subtitle: "Museum",
    menu: getMenuChildren({root: "/kp", children: menu}),
    primaryAction: primaryAction,
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
        "expanded": false,
        "placeholder": "Søk i KulturPunkt"
    }
}