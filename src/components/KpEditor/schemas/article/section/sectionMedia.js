import media from "./media"

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["media"]
        },
        "sectionLayout": {
            "type": "string",
            "enum": [
                "list",
                "grid",
                "slideshow",
            ],
            "enumNames": [
                "Liste",
                "Grid",
                "Slideshow",
            ],
            "default" : "grid"
          },
        "media": media
    }
}