import schema from "./PageAnnotate.schema"
import uiSchema from "./PageAnnotate.uiSchema"
import formData from "./PageAnnotate.formData"
import Preview from "./PageAnnotatePreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}