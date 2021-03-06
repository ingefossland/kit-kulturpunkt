import schema from "./schema";
import uiSchema from "./uiSchema";
import PreviewTemplate from "../../preview/PageMap"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'pageMap',
    schema: schema,
    uiSchema: uiSchema,
    preview: {
        template: PreviewTemplate
    }
}