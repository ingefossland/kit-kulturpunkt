import schema from "./PageMap.schema"
import uiSchema from "./PageMap.uiSchema"
import formData from "./PageMap.formData"
import Preview from "./PageMapPreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}