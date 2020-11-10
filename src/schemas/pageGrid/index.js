import schema from "./schema";
import uiSchema from "./uiSchema";
import formData from "./formData"
//import PreviewTemplate from "@frontend-components/admin/lib/components/AppKp/preview/Page"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'kioskGrid',
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
//        template: PreviewTemplate
    }
}