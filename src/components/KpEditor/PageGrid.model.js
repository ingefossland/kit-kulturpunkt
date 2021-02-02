import schema from "./PageGrid.schema"
import uiSchema from "./PageGrid.uiSchema"
import formData from "./PageGrid.formData"
import Preview from "./PageGridPreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}