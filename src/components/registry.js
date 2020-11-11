
import ParentIdField from "./ParentIdField/ParentIdField"

import KpPageField from "./KpPage/KpPageField"
import KpAnnotateArrayField from "./KpPage/KpAnnotateArrayField"
import KpAnnotateImageField from "./KpPage/KpAnnotateImageField"

import KpLinkField from "./KpLink/KpLinkField"
import KpLinkLayout from "./KpLink/KpLinkLayout"

import KpLinkMediaLayout from "./KpLink/KpLinkMediaLayout"

import KpDeviceField from "./KpDevice/KpDeviceField"
import KpDeviceLinkField from "./KpDevice/KpDeviceLinkField"

import pageEditor from "./PageEditor/registry"

export default {
    "fields": {
        "parentId": ParentIdField,
        "kpPage": KpPageField,
        "kpAnnotateArray": KpAnnotateArrayField,
        "kpAnnotateImage": KpAnnotateImageField,
        "kpLink": KpLinkField,
        "kpLinkLayout": KpLinkLayout,
        "kpLinkMediaLayout": KpLinkMediaLayout,
        "kpDevice": KpDeviceField,
        "kpDeviceLink": KpDeviceLinkField,
        ...pageEditor.fields
    },
    "widgets": {
//        "colorSettings": ColorSettingsWidget,
//        "listSettings": ListSettingsWidget,
//        "gridSettings": GridSettingsWidget,
//        "sizeSettings": SizeSettingsWidget,
//        "placementSettings": PlacementSettingsWidget
    },
    "models": {
    }
}