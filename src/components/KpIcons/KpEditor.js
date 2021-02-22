import React from "react"
import EditorIcon from "./EditorIcon"

import kpTheme from "../../app/settings/kp/theme"

const kpColor = kpTheme.palette.primary.main

const KpEditorIcon = (props) => <EditorIcon {...props} color={kpColor} />

export default KpEditorIcon