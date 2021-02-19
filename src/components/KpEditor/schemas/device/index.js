import schema from "./schema";
import uiSchema from "./uiSchema";
import formData from "./formData";
import PreviewTemplate from "./PreviewTemplate"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'device',
    schema: schema,
    formData: formData,
    uiSchema: uiSchema,
    preview: {
        template: PreviewTemplate
    }
}