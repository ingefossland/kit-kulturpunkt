import AppIcon from "../../icons/KpAppIcon"
//import getMenuChildren from "../../utils/getMenuChildren"

import menu from "./menu"
import primaryAction from "../action"
import theme from "./theme"

export default {
    theme: theme,
    icon: AppIcon(),
    root: "/kp",
    siteId: 1,
    collectionId: 54,
    title: "KulturPunkt",
    subtitle: "Museum",
    menu: menu,
    primaryAction: primaryAction,
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
        "expanded": false,
        "placeholder": "Søk i KulturPunkt"
    }
}