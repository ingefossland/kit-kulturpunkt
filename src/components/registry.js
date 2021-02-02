

import kpEditor from "./KpEditor/registry"

import documentEditor from "./DocumentEditor/registry"
import referenceEditor from "./ReferenceEditor/registry"
import collectionEditor from "./CollectionEditor/registry"
import pageEditor from "./PageEditor/registry"
import themeEditor from "./ThemeEditor/registry"

import localizedString from "./LocalizedString/registry"

export default {
    "fields": {
        ...kpEditor.fields,
        ...documentEditor.fields,
        ...referenceEditor.fields,
        ...collectionEditor.fields,
        ...pageEditor.fields,
        ...themeEditor.fields,
        ...localizedString.fields
    },
    "widgets": {
        ...kpEditor.widgets,
        ...documentEditor.widgets,
        ...referenceEditor.widgets,
        ...collectionEditor.widgets,
        ...pageEditor.widgets,
        ...themeEditor.widgets
    },
    "models": {
        ...kpEditor.models,
        ...documentEditor.models,
        ...referenceEditor.models,
        ...collectionEditor.models,
        ...pageEditor.models,
        ...themeEditor.models
    }
}