import ParentIdField from "./ParentIdField/ParentIdField"
import SectionLayout from "./Section/SectionLayout"

import KpPageField from "./KpPage/KpPageField"
import KpAnnotateArrayField from "./KpPage/KpAnnotateArrayField"
import KpAnnotateImageField from "./KpPage/KpAnnotateImageField"


import KpLinkField from "./KpLink/KpLinkField"
import KpLinkMediaLayout from "./KpLink/KpLinkMediaLayout"

export default {
    "fields": {
        "parentId": ParentIdField,
        "sectionLayout": SectionLayout,
        "kpPage": KpPageField,
        "kpAnnotateArray": KpAnnotateArrayField,
        "kpAnnotateImage": KpAnnotateImageField,
        "kpLink": KpLinkField,
        "kpLinkMediaLayout": KpLinkMediaLayout,
    },
    "widgets": {
    },
    "models": {
    }
}