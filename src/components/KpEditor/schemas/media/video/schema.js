import media from "../media/schema"
import category from './category/schema'
import dependencies from './dependencies'
import audiotracks from "../media/audiotracks/schema"
import captions from "../media/captions/schema"

export default {
    ...media,
    "properties": {
        ...media.properties,
        "content": {
            ...media.properties.content,
            "properties": {
                ...media.properties.content.properties,
                "category": category,
                "volume": {
                    "type": "integer",
                    "minimum": -10,
                    "maximum": 10
                },
                "videoWidth": {
                    "type": "number",
                    "readonly": true
                },
                "videoHeight": {
                    "type": "number",
                    "readonly": true
                },
                "duration": {
                    "type": "number",
                    "readonly": true
                },
                "audiotracks": audiotracks,
                "captions": captions
            },
            "dependencies": {
                ...media.properties.content.dependencies,
                ...dependencies
            }
        }
    }
}