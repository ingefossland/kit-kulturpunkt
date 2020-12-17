

import kpPage from "./KpPage/registry"
import kpLink from "./KpLink/registry"
import kpDevide from "./KpDevice/registry"
import kpLocation from "./KpLocation/registry"

import documentEditor from "./DocumentEditor/registry"
import referenceEditor from "./ReferenceEditor/registry"
import collectionEditor from "./CollectionEditor/registry"
import pageEditor from "./PageEditor/registry"
import themeEditor from "./ThemeEditor/registry"

import localizedString from "./LocalizedString/registry"

export default {
    "fields": {
        ...kpPage.foelds,
        ...kpLink.fields,
        ...kpDevide.fields,
        ...kpLocation.fields,
        ...documentEditor.fields,
        ...referenceEditor.fields,
        ...collectionEditor.fields,
        ...pageEditor.fields,
        ...themeEditor.fields,
        ...localizedString.fields
    },
    "widgets": {
        ...documentEditor.widgets,
        ...referenceEditor.widgets,
        ...collectionEditor.widgets,
        ...pageEditor.widgets,
        ...themeEditor.widgets
    },
    "models": {
        ...documentEditor.models,
        ...referenceEditor.models,
        ...collectionEditor.models,
        ...pageEditor.models,
        ...themeEditor.models
    }
}