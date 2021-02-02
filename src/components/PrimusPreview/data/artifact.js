import person from "./person"
import exhibition from "./exhibition"

export default {
    "identifier": "TKM-1769-1982",
    "imageUrl": "https://dms04.dimu.org/image/0136LRQwSi6g?dimension=1200x1200",
    "title": "Nixons visions",
    "type": "Billedkunst",
    "designation": "Fotografi",
    "producer": {
        ...person,
        "role": "Kunstner"
    },
    "dating": {
        "value": "1971",
        "from": "1971"
    },
    "measures": [
        {
            "value": "56x47cm",
            "height": 56,
            "width": 47,
            "unit": "cm"
        }
    ],
    "materials": [
        {
            "value": "Fotografi"
        }
    ],
    "techniques": [
        {
            "value": "Collage"
        }
    ],
    "exhibitions": [
        exhibition
    ]
}