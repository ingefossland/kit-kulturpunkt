//import settings from "./PageSettings.uiSchema";
import content from "./KpPageContent.uiSchema"

import KpPageField from "./KpPageField"

export default {
    "ui:field": KpPageField,
    "ui:fieldset": [
        "content",
        "settings"
    ],
    "content": content
}