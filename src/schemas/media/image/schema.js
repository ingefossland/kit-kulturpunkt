import media from "../media/schema"
import category from './category/schema';
import iptcdata from "./iptcdata/schema"

export default {
    ...media,
    "properties": {
        ...media.properties,
        "content": {
            ...media.properties.content,
            "properties": {
                ...media.properties.content.properties,
                "category": category,
                "iptcdata": iptcdata
            }
        }
    }
}