import React from "react"
import EditorIcon from "./EditorIcon"
import kioskTheme from "../../app/settings/kiosk/theme"
const kioskColor = kioskTheme.palette.primary.main

const KioskEditorIcon = (props) => <EditorIcon {...props} color={kioskColor} />

export default KioskEditorIcon