import React from "react"
import AppIcon from "./AppIcon"

import kpTheme from "../../app/settings/kp/theme"
const kpColor = kpTheme.palette.primary.main

const KpAppIcon = (props) => <AppIcon {...props} color={kpColor} variant="outlined" text="Kp" />

export default KpAppIcon