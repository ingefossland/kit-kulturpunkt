import React from "react"

import AppIcon from "./AppIcon"
import MenuIcon from "./MenuIcon"
import EditorIcon from "./EditorIcon"

import kpTheme from "../../app/settings/kp/theme"
import kioskTheme from "../../app/settings/kiosk/theme"

const kpColor = kpTheme.palette.primary.main
const kioskColor = kioskTheme.palette.primary.main

const KpAppIcon = (props) => <AppIcon {...props} color={kpColor} variant="outlined" text="Kp" />
const KpMenuIcon = (props) => <MenuIcon {...props} variant="outlined" text="Kp"  />
const KpEditorIcon = (props) => <EditorIcon {...props} color={kpColor} />

const KioskAppIcon = (props) => <AppIcon {...props} color={kioskColor} variant="outlined" text="Ki" />
const KioskMenuIcon = (props) => <MenuIcon {...props} variant="outlined" text="Ki"  />
const KioskEditorIcon = (props) => <EditorIcon {...props} color={kioskColor} />

export {
    KpAppIcon,
    KpMenuIcon,
    KpEditorIcon,

    KioskAppIcon,
    KioskMenuIcon,
    KioskEditorIcon,

}