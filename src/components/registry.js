

import kpPage from "./KpPage/registry"
import kpLink from "./KpLink/registry"
import kpDevide from "./KpDevice/registry"
import kpLocation from "./KpLocation/registry"

import documentEditor from "./DocumentEditor/registry"
import collectionEditor from "./CollectionEditor/registry"
import pageEditor from "./PageEditor/registry"
import themeEditor from "./ThemeEditor/registry"

export default {
    "fields": {
        ...kpPage.foelds,
        ...kpLink.fields,
        ...kpDevide.fields,
        ...kpLocation.fields,
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