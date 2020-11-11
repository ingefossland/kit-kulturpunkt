import PageEditorField from "./PageEditorField"
import PageEditor from "./PageEditorLayout"
import PageContentField from "./PageContentField"
import PageContent from "./PageContentLayout"
import PageSettingsField from "./PageSettingsField"
import PageSettings from "./PageSettingsLayout"

export default {
    fields: {
        "pageEditor": PageEditorField,
        "pageEditorLayout": PageEditor,
        "pageContent": PageContentField,
        "pageContentLayout": PageContent,
        "pageSettings": PageSettingsField,
        "pageSettingsLayout": PageSettings
    }

}