import schema from './schema';
import uiSchema from './uiSchema';
import PreviewTemplate from "../../MediaPreview/BulkMediaPreview"

export default {
    schemaType: 'media',
    name: 'bulk',
    title: 'Media/Bulk',
    schema: schema,
    uiSchema: uiSchema,
    preview: {
        template: PreviewTemplate
    }
}