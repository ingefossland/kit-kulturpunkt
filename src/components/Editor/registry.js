import PageEditorField from "./PageEditorField"
import PageEditor from "./PageEditor"

import PageSettingsField from "./PageSettingsField"
import PageSettings from "./PageSettings"

import PageContentField from "./PageContentField"
import PageContent from "./PageContent"

import BulkEditorField from "./BulkEditorField"
import BulkEditor from "./BulkEditor"


export default {
    "fieldtypes": {
    },
    "fields": {
        "pageEditor": PageEditorField,
        "pageSettings": PageSettingsField,
        "pageContent": PageContentField,
        "bulkEditor": BulkEditorField
    },
    "layouts": {
        "pageEditor": PageEditor,
        "pageSettings": PageSettings,
        "pageContent": PageContent,
        "bulkEditor": BulkEditor
    },
    "widgets": {
    }
}