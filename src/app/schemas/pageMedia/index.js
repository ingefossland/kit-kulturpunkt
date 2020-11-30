import schema from "./schema";
import uiSchema from "./uiSchema";
import PreviewTemplate from "../../preview/KioskPreview"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'pageMedia',
    schema: schema,
    uiSchema: uiSchema,
    preview: {
        template: PreviewTemplate
    }
}