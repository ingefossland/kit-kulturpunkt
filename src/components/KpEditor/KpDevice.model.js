import schema from "./KpDevice/schema"
import uiSchema from "./KpDevice/uiSchema"
import formData from "./KpDevice/formData"
import Preview from "./KpDevicePreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}