

import media from "../media/schema"

export default {
    ...media,
    "properties": {
        ...media.properties,
        "content": {
            ...media.properties.content
        }
    }
}