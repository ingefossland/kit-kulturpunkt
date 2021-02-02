import links from "./KpLinks.schema"
//import linksLayout from "./__KpLinksLayout.schema"

export default {
    "type": "object",
    "properties": {
        "documentType": {
            "type": "string",
            "enum": [
                "pageHome",
                "pageTopic",
                "pageMap"
            ],
            "enumNames": [
                "Startside",
                "Tema",
                "Kart"
            ]
        },
        "locale": {
            "type": "string",
            "default": "no"
        },
        "collectionId": {
            "type": "string",
        },
        "parentId": {
            "type": "string",
        },
        "schemaId": {
            "type": "number",
            "default": 1
        },
        "title": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "properties": {
                "importId": {
                    "type": "string",
                },
                "title": {
                    "type": "localizedString"
                },
                "titleImage": {
                    "type": "image"
                },
                "leadtext": {
                    "type": "localizedString"
                },
                "bodytext": {
                    "type": "localizedString"
                },
                "mapLayout": {
                    "type": "string",
                    "enum": ["default","roundtrip"],
                    "default": "default"
                },
                "mediaLayout": {
                    "type": "string",
                    "enum": ["gallery","autoplay"],
                    "default": "gallery"
                },
                "annotateLayout": {
                    "type": "string",
                    "enum": ["imagemap","legends"],
                    "default": "imagemap"
                },
                "annotateColor": {
                    "type": "string",
                    "format": "color",
                    "enum": ["red","green","blue","black","white"]
                },
                "backgroundImage": {
                    "type": "image",
                    "annotations": true,
                    "cropdata": true,
                    "filters": ["opacity"],
                },
                "parallaxImage": {
                    "type": "image",
                    "cropdata": true,
                    "filters": ["opacity"],
                },
                "linksLayout": {
                    "type": "string",
                    "enum": [
                        "list",
                        "mosaic",
                        "imagelegend",
                        "imagemap",
                        "gallery",
                        "autoplay",
                        "timeline"
                    ],
                    "enumNames": [
                        "Liste",
                        "Mosaikk",
                        "Bildeforklaring",
                        "Bildekart",
                        "Mediagalleri",
                        "Autoplay",
                        "Tidslinje"
                    ],
                    "default" : "list"
                },
                "links": links,
                "isPartOf": {
                    "type": "array",
                    "items": {
                        "type": "reference",
                        "documentType": "presentation",
                        "referenceType": "pageIsPartOf",
                        "_reverseReferenceType": "presentationHasPages",
                        "_reverseReference": "hasPages[]"
                    }
                }

            }
        }
    }
}