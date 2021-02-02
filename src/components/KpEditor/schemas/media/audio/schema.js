import media from "../media/schema"
import category from './category/schema';
import dependencies from './dependencies';
import artwork from "../media/artwork/schema"
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
                "duration": {
                    "type": "number"
                },
                "volume": {
                    "type": "integer",
                    "minimum": -10,
                    "maximum": 10
                },
                "artwork": artwork,
                "audiotracks": audiotracks,
                "captions": captions
            },
            "dependencies": dependencies
        }
    }
}