import palette from "./ThemePalette.schema"

export default {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "enum": ["light","dark"],
            "enumNames": ["Light","Dark"],
            "default": "light"
        },
        "palette": palette,
        "colors": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "color"
            }
        }
    }
}