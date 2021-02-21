import schema from "./schema";
import uiSchema from "./uiSchema";
import formData from "./formData"
//import PreviewTemplate from "@frontend-components/admin/lib/components/AppKp/preview/Article"

export default {
    id: 1,
    schemaType: "documents",
    name: 'object',
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
//        template: PreviewTemplate
    }
}