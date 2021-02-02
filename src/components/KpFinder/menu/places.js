import latest from "./latest"
import trash from "./trash"

export default {
    role: "section",
    icon: "photo",
    title: "Places",
    pathname: "places",
    children: [
        latest,
        trash
    ]
}