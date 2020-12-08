

import KpPageField from "./KpPage/KpPageField"
import KpAnnotateArrayField from "./KpPage/KpAnnotateArrayField"
import KpAnnotateImageField from "./KpPage/KpAnnotateImageField"

import KpLinkField from "./KpLink/KpLinkField"
import KpLinkLayout from "./KpLink/KpLinkLayout"

import KpLinkMediaLayout from "./KpLink/KpLinkMediaLayout"

import KpDeviceField from "./KpDevice/KpDeviceField"
import KpDeviceLinkField from "./KpDevice/KpDeviceLinkField"

import documentEditor from "./DocumentEditor/registry"
import collectionEditor from "./CollectionEditor/registry"
import pageEditor from "./PageEditor/registry"
import themeEditor from "./ThemeEditor/registry"

export default {
    "fields": {
        "kpPage": KpPageField,
        "kpAnnotateArray": KpAnnotateArrayField,
        "kpAnnotateImage": KpAnnotateImageField,
        "kpLink": KpLinkField,
        "kpLinkLayout": KpLinkLayout,
        "kpLinkMediaLayout": KpLinkMediaLayout,
        "kpDevice": KpDeviceField,
        "kpDeviceLink": KpDeviceLinkField,
        ...documentEditor.fields,
        ...collectionEditor.fields,
        ...pageEditor.fields,
        ...themeEditor.fields
    },
    "widgets": {
        ...documentEditor.widgets,
        ...collectionEditor.widgets,
        ...pageEditor.widgets,
        ...themeEditor.widgets
    },
    "models": {
        ...documentEditor.models,
        ...collectionEditor.models,
        ...pageEditor.models,
        ...themeEditor.models
    }
}