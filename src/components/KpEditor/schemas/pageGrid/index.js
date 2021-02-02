import schema from "./schema";
import uiSchema from "./uiSchema";
import formData from "./formData"
import PreviewTemplate from "../../preview/KioskPreview"

export default {
    id: 1,
    schemaType: 'documents',
    name: 'pageGrid',
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: PreviewTemplate
    }
}