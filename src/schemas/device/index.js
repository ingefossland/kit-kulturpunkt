import schema from "./schema";
import uiSchema from "./uiSchema";
import PreviewTemplate from "@frontend-components/admin/lib/components/AppKp/preview/Page"

export default {
    id: 1,
    schemaType: 'kp',
    name: 'device',
    schema: schema,
    uiSchema: uiSchema,
    preview: {
        template: PreviewTemplate
    }
}