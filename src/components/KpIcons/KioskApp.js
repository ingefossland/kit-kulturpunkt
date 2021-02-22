import React from "react"
import AppIcon from "./AppIcon"
import kioskTheme from "../../app/settings/kiosk/theme"

const kioskColor = kioskTheme.palette.primary.main

const KioskAppIcon = (props) => <AppIcon {...props} color={kioskColor} variant="filled" text="Ki" />

export default KioskAppIcon