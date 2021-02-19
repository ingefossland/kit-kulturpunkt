import KpDeviceField from "./KpDeviceField"
import KpDeviceLinkField from "./KpDeviceLinkField"

import kpLocation from "./KpLocation/registry"

import KpPageField from "./KpPageField"
import KpLinkField from "./KpLinkField"
import KpLinkLayout from "./KpLinkLayout"
import KpLinkModel from "./KpLink.model"

import KpAnnotateImageField from "./KpAnnotateImageField"
import KpAnnotateLinksField from "./KpAnnotateLinksField"

export default {
    "fields": {
        "kpPage": KpPageField,
        "kpLink": KpLinkField,
        "kpLinkLayout": KpLinkLayout,
        "kpAnnotateImage": KpAnnotateImageField,
        "kpAnnotateLinks": KpAnnotateLinksField,

        "kpDevice": KpDeviceField,
        "kpDeviceLink": KpDeviceLinkField,

        ...kpLocation.fields,
    },
    "widgets": {
    },
    "models": {
        "kpLink": KpLinkModel,
    }
}