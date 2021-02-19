import React from "react"
import AppIcon from "./AppIcon"
import MenuIcon from "./MenuIcon"
import EditorIcon from "./EditorIcon"

import kpIcons from "../components/KpIcons"
import kpTheme from "../app/settings/kp/theme"
import kioskTheme from "../app/settings/kiosk/theme"

const kpColor = kpTheme.palette.primary.main
const kioskColor = kioskTheme.palette.primary.main

export default {
    ...kpIcons,
    "app": <AppIcon />,
    "editor": <EditorIcon />,
    "primusApp": <AppIcon variant="outlined" color="red" text="Pr" />,
    "primusMenu": <MenuIcon variant="filled" text="Pr" />,
    "kpApp": <AppIcon variant="outlined" color={kpColor} text="Kp" />,
    "kpMenu": <MenuIcon variant="outlined" text="Kp" />,
    "kioskApp": <AppIcon variant="filled" color={kioskColor} text="Ki" />,
    "kioskMenu": <MenuIcon variant="filled" text="Ki" />
}