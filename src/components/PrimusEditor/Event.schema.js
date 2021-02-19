import eventType from "./EventType.schema"
import person from "./Person.schema"
import place from "./Place.schema"
import dating from "./Dating.schema"

export default {
    "type": "object",
    "properties": {
        "eventType": eventType,
        "dating": dating,
        "place": place,
        "title": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "people": {
            "type": "array",
            "minItems": 1,
            "items": person
        },
        "places": {
            "type": "array",
            "items": place
        }
    }
}