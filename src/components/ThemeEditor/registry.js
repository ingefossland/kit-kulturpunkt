import ThemeEditor from "./ThemeEditor.model"

import ThemePaletteModel from "./ThemePalette.model"
import ThemePaletteField from "./ThemePaletteField"

import ThemePaletteColorField from "./ThemePaletteColorField"
import ThemeColorWidget from "./ThemeColorWidget"

export default {
    fields: {
        "themePalette": ThemePaletteField,
        "themePaletteColor": ThemePaletteColorField,
    },
    widgets: {
        "themeColor": ThemeColorWidget
    },
    models: {
        "themeEditor": ThemeEditor,
        "themePalette": ThemePaletteModel
    }

}