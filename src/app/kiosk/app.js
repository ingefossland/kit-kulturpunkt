import AppIcon from "../../icons/KioskAppIcon"
import getMenuChildren from "../../utils/getMenuChildren"
import menu from "./menu"
import theme from "./theme"
import primaryAction from "../action"

export default {
    theme: theme,
    icon: AppIcon,
    root: "/kiosk",
    siteId: 1,
    collectionId: 54,
    title: "Kiosk",
    subtitle: "Museum",
    menu: getMenuChildren({root: "/kiosk", collectionId: 54, children: menu}),
    primaryAction: primaryAction,
    languages: [
        "no", "sv", "en", "de", "es", "fr"
    ],
    search: {
        "expanded": false,
        "placeholder": "Søk i Kiosk"
    }
}