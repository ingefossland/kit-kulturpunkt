import React from "react"

import kpIcons from "../components/KpIcons"

import AppIcon from "./AppIcon"
import MenuIcon from "./MenuIcon"
import EditorIcon from "./EditorIcon"

export default {
    ...kpIcons,
    "app": <AppIcon />,
    "editor": <EditorIcon />,
    "primusApp": <AppIcon variant="outlined" color="red" text="Pr" />,
    "primusMenu": <MenuIcon variant="filled" text="Pr" />,
    "kpApp": <AppIcon variant="outlined" color="red" text="Kp" />,
    "kpMenu": <MenuIcon variant="outlined" text="Kp" />,
    "kioskApp": <AppIcon variant="filled" color="red" text="Ki" />,
    "kioskMenu": <MenuIcon variant="filled" text="Ki" />
}