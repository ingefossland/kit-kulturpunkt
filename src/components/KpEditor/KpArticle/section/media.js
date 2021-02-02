import mediaSize from "./mediaSize"
import mediaFormat from "./mediaFormat"

export default {
    "type": "array",
    "items": {
        "type": "media",
        "properties": {
            "mediaSize": mediaSize,
            "mediaFormat": mediaFormat,
            "mediaLayout": {
                "type": "string",
                "default": "frame"
            },
            "content": {
                "type": "object",
                "properties": {
                    "headline": {
                        "type": "localizedString"
                    },
                    "caption": {
                        "type": "localizedString"
                    }
                }
            }
        }
    }
}