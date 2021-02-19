

import kpEditor from "./KpEditor/registry"

import documentEditor from "./DocumentEditor/registry"
import referenceEditor from "./ReferenceEditor/registry"
import collectionEditor from "./CollectionEditor/registry"
import pageEditor from "./PageEditor/registry"
import themeEditor from "./ThemeEditor/registry"

import localizedString from "./LocalizedString/registry"

import primusEditor from "./PrimusEditor/registry"
import primusMedia from "./PrimusMedia/registry"


export default {
    "fields": {
        ...documentEditor.fields,
        ...referenceEditor.fields,
        ...collectionEditor.fields,
        ...pageEditor.fields,
        ...themeEditor.fields,
        ...localizedString.fields,
        ...primusEditor.fields,
        ...primusMedia.fields,
        ...kpEditor.fields
    },
    "widgets": {
        ...documentEditor.widgets,
        ...referenceEditor.widgets,
        ...collectionEditor.widgets,
        ...pageEditor.widgets,
        ...themeEditor.widgets,
        ...primusEditor.widgets,
        ...primusMedia.widgets,
        ...kpEditor.widgets
    },
    "models": {
        ...documentEditor.models,
        ...referenceEditor.models,
        ...collectionEditor.models,
        ...pageEditor.models,
        ...themeEditor.models,
        ...primusEditor.models,
        ...primusMedia.models,
        ...kpEditor.models
    }
}