import schema from "./schema";
import uiSchema from "./uiSchema";
import formData from "./formData";
import PreviewTemplate from "./PreviewTemplate"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'pageHome',
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: PreviewTemplate
    }
}