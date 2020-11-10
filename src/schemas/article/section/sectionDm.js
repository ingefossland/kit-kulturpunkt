import ekultur from "./ekultur"

export default {
    "type": "object",
    "properties": {
        "sectionType": {
            "enum": ["dm"]
        },
        "sectionLayout": {
            "type": "string",
            "enum": [
              "grid",
              "grid-wide",
              "slideshow",
              "slideshow-wide"
            ],
            "enumNames": [
              "Grid",
              "Grid Wide",
              "Slideshow",
              "Slideshow Wide"
            ],
            "default" : "grid"
          },
        "references": ekultur
    }
}